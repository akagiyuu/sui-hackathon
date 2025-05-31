pub mod google;

use std::sync::Arc;

use axum::{Router, routing};

use crate::state::ApiState;

pub fn build() -> Router<Arc<ApiState>> {
    Router::new()
        .route("/auth/google", routing::get(google::google))
        .route("/auth/google/authorized", routing::get(google::authorized))
}
