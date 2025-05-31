mod get;

use std::sync::Arc;

use axum::{Router, routing};

use crate::state::ApiState;

pub use get::*;

pub fn build() -> Router<Arc<ApiState>> {
    Router::new().route("/video/{}", routing::get(get))
}
