use std::sync::Arc;

use axum::{Json, extract::State};

use crate::{
    database::{self, account::Account},
    error::Result,
    state::ApiState,
    util::auth::Claims,
};

#[utoipa::path(
    get,
    tag = "Auth",
    path = "/auth/me",
    operation_id = "auth::me",
    security(("jwt_token" = []))
)]
#[axum::debug_handler]
pub async fn me(state: State<Arc<ApiState>>, claims: Claims) -> Result<Json<Account>> {
    let account = database::account::get(claims.sub, &state.database_pool).await?;

    Ok(Json(account))
}
