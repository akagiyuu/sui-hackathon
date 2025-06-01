use std::sync::Arc;

use axum::{
    Json,
    extract::{Path, State},
};
use serde::Deserialize;
use utoipa::ToSchema;
use uuid::Uuid;

use crate::{
    database::{self, video::ReactionKind},
    error::Result,
    state::ApiState,
    util::auth::Claims,
};

#[derive(Deserialize, ToSchema)]
pub struct ReactRequest {
    pub reaction_kind: ReactionKind,
}

#[utoipa::path(
    post,
    tag = "Video",
    path = "/video/{id}/react",
    operation_id = "video::react",
    params(
        ("id" = Uuid, Path, description = "Video id")
    ),
    request_body = ReactRequest
)]
pub async fn react(
    state: State<Arc<ApiState>>,
    _: Claims,
    Path(id): Path<Uuid>,
    Json(request): Json<ReactRequest>,
) -> Result<()> {
    database::video::react(id, request.reaction_kind, &state.database_pool).await?;

    Ok(())
}
