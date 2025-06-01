use std::sync::Arc;

use axum::{
    Json,
    extract::{Path, State},
};
use futures::{StreamExt, TryStreamExt, stream};
use rand::seq::IteratorRandom;
use uuid::Uuid;

use crate::{database, error::Result, state::ApiState};

use super::Video;

const RANDOM_AMOUNT: usize = 5;

#[utoipa::path(
    get,
    tag = "Video",
    path = "/video/{id}/suggestion",
    operation_id = "video::get_suggestion",
    params(
        ("id" = Uuid, Path, description = "Video id")
    ),
)]
pub async fn get_suggestion(
    state: State<Arc<ApiState>>,
    Path(id): Path<Uuid>,
) -> Result<Json<Vec<Video>>> {
    let videos = database::video::query_all(None, &state.database_pool).await?;

    let suggestion = stream::iter(
        videos
            .into_iter()
            .filter(|video| video.id != id)
            .choose_multiple(&mut rand::rng(), RANDOM_AMOUNT),
    )
    .then(|raw| Video::from_raw(raw, &state.database_pool))
    .try_collect()
    .await?;

    Ok(Json(suggestion))
}
