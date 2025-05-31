use std::sync::Arc;

use axum::{
    Json,
    extract::{Path, State},
};
use uuid::Uuid;

use crate::{
    database::{self, video::Video},
    error::Result,
    state::ApiState,
};

#[utoipa::path(
    get,
    tag = "Video",
    path = "/video/{id}",
    operation_id = "video::get",
    params(
        ("id" = Uuid, Path, description = "Video id")
    ),
    security(("jwt_token" = []))
)]
pub async fn get(state: State<Arc<ApiState>>, Path(id): Path<Uuid>) -> Result<Json<Option<Video>>> {
    let video = database::video::get(id, &state.database_pool).await?;

    Ok(Json(video))
}
