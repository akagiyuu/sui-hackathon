use std::sync::Arc;

use axum::{Json, extract::State};
use futures::{StreamExt, TryStreamExt};

use crate::{database, error::Result, state::ApiState, util::auth::Claims};

use super::Video;

#[utoipa::path(get, tag = "Video", path = "/video/my", operation_id = "video::my")]
pub async fn my(state: State<Arc<ApiState>>, claims: Claims) -> Result<Json<Vec<Video>>> {
    let videos = database::video::get_by_account(claims.sub, &state.database_pool)
        .then(|raw| async { Video::from_raw(raw?, &state.database_pool).await })
        .try_collect::<Vec<_>>()
        .await?;

    Ok(Json(videos))
}
