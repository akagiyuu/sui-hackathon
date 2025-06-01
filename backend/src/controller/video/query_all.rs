use std::sync::Arc;

use axum::{
    Json,
    extract::{Query, State},
};
use futures::{StreamExt, TryStreamExt, stream};
use serde::Deserialize;

use crate::{database, error::Result, state::ApiState};

use super::Video;

#[derive(Deserialize)]
pub struct QueryParams {
    pub query: Option<String>,
}

#[utoipa::path(get, tag = "Video", path = "/video", operation_id = "video::query_all")]
pub async fn query_all(
    state: State<Arc<ApiState>>,
    Query(QueryParams { query }): Query<QueryParams>,
) -> Result<Json<Vec<Video>>> {
    let videos_raw =
        database::video::query_all(query.as_ref().map(|x| x.as_str()), &state.database_pool)
            .await?;

    let videos = stream::iter(videos_raw.into_iter())
        .then(|raw| Video::from_raw(raw, &state.database_pool))
        .try_collect::<Vec<_>>()
        .await?;

    Ok(Json(videos))
}
