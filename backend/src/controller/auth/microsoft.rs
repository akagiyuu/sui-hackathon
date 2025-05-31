use std::sync::Arc;

use axum::{
    extract::{Query, State},
    response::{IntoResponse, Redirect},
};
use openidconnect::{AuthorizationCode, CsrfToken, Nonce};
use serde::Deserialize;
use tower_sessions::Session;

use crate::{
    database,
    error::{AuthError, Result},
    state::ApiState,
    util::auth::Claims,
};

const KEY: &str = "microsoft";

#[utoipa::path(get, tag = "Auth", path = "/auth/microsoft")]
pub async fn microsoft(state: State<Arc<ApiState>>, session: Session) -> impl IntoResponse {
    let (auth_url, csrf, nonce) = state.microsoft_client.generate();

    session.insert(KEY, (csrf, nonce)).await.unwrap();

    Redirect::to(auth_url.as_ref())
}

#[derive(Debug, Deserialize)]
pub struct AuthRequest {
    pub code: String,
    pub state: String,
}

pub async fn authorized(
    state: State<Arc<ApiState>>,
    session: Session,
    Query(query): Query<AuthRequest>,
) -> Result<String> {
    let (csrf, nonce): (CsrfToken, Nonce) = session.get(KEY).await.unwrap().unwrap();

    let claims = state
        .microsoft_client
        .get_claims(
            AuthorizationCode::new(query.code),
            CsrfToken::new(query.state),
            csrf,
            nonce,
            &state.http_client,
        )
        .await
        .unwrap();

    tracing::info!(claims =? claims);

    let email = claims.email().expect("Microsoft account must have email");
    let name = {
        let mut names = claims
            .name()
            .expect("Microsoft account must have name")
            .iter();
        names.next().expect("Microsoft account must have name").1
    };

    database::account::create(email, name, &state.database_pool).await?;
    let id = database::account::get_by_email(email, &state.database_pool)
        .await?
        .expect("Account must be created in previous step to get here");

    let claims = Claims::new(id);

    let token = claims.as_token().map_err(|error| {
        tracing::error!(error =? error);
        AuthError::InvalidAuthToken
    })?;

    Ok(token)
}
