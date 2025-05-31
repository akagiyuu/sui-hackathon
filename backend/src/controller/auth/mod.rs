pub mod google;
mod me;
pub mod microsoft;

use std::sync::Arc;

use axum::{Router, routing};

use crate::state::ApiState;

pub use me::*;

pub fn build() -> Router<Arc<ApiState>> {
    Router::new()
        .route("/auth/google", routing::get(google::google))
        .route("/auth/google/authorized", routing::get(google::authorized))
        .route("/auth/microsoft", routing::get(microsoft::microsoft))
        .route(
            "/auth/microsoft/authorized",
            routing::get(microsoft::authorized),
        )
        .route("/auth/me", routing::get(me))
}
