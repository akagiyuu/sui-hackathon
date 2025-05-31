use std::sync::Arc;

use axum::{
    Json,
    extract::{Path, State},
};
use uuid::Uuid;

use crate::{database, error::Result, state::ApiState};

use super::Video;

#[utoipa::path(
    get,
    tag = "Video",
    path = "/video/{id}",
    operation_id = "video::get",
    params(
        ("id" = Uuid, Path, description = "Video id")
    ),
)]
pub async fn get(state: State<Arc<ApiState>>, Path(id): Path<Uuid>) -> Result<Json<Option<Video>>> {
    let video = match database::video::get(id, &state.database_pool).await? {
        Some(raw) => Some(Video::from_raw(raw, &state.database_pool).await?),
        None => None,
    };

    Ok(Json(video))
}
