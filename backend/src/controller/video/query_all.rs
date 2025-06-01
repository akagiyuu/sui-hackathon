use std::sync::Arc;

use axum::{Json, extract::State};
use futures::{StreamExt, TryStreamExt};

use crate::{database, error::Result, state::ApiState};

use super::Video;

#[utoipa::path(get, tag = "Video", path = "/video", operation_id = "video::query_all")]
pub async fn query_all(state: State<Arc<ApiState>>) -> Result<Json<Vec<Video>>> {
    let video = database::video::get_all(&state.database_pool)
        .then(|raw| async { Video::from_raw(raw?, &state.database_pool).await })
        .try_collect::<Vec<_>>()
        .await?;

    Ok(Json(video))
}
