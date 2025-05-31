use std::sync::Arc;

use sqlx::PgPool;

use crate::{config::CONFIG, util};
use openidconnect::reqwest;

pub struct ApiState {
    pub database_pool: PgPool,
    pub http_client: reqwest::Client,
    pub google_client: util::auth::Client,
}

impl ApiState {
    pub async fn new() -> Arc<Self> {
        let database_pool = PgPool::connect(&CONFIG.database_url).await.unwrap();

        let http_client = reqwest::ClientBuilder::new()
            .redirect(reqwest::redirect::Policy::none())
            .build()
            .unwrap();

        let google_client = util::auth::new(
            CONFIG.google_client_id.clone(),
            CONFIG.google_client_secret.clone(),
            CONFIG.google_issuer_url.clone(),
            CONFIG.google_redirect_url.clone(),
            &http_client,
        )
        .await
        .unwrap();

        Arc::new(Self {
            database_pool,
            http_client,
            google_client,
        })
    }
}
