mod get;
mod get_all;
mod upload;

use std::sync::Arc;

use axum::{Router, routing};

use crate::state::ApiState;

pub use get::*;
pub use get_all::*;
pub use upload::*;

pub fn build() -> Router<Arc<ApiState>> {
    Router::new()
        .route("/video", routing::post(upload))
        .route("/video/{id}", routing::get(get))
        .route("/video", routing::get(get_all))
}
