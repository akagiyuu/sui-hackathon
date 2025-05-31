use std::sync::Arc;

use axum::{Json, extract::State};
use futures::TryStreamExt;

use crate::{
    database::{self, video::Video},
    error::Result,
    state::ApiState,
};

#[utoipa::path(get, tag = "Video", path = "/video", operation_id = "video::get_all")]
pub async fn get_all(state: State<Arc<ApiState>>) -> Result<Json<Vec<Video>>> {
    let video = database::video::get_all(&state.database_pool)
        .try_collect::<Vec<_>>()
        .await?;

    Ok(Json(video))
}
