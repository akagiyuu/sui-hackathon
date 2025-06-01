use std::sync::Arc;

use axum::{Json, body::Bytes, extract::State};
use axum_typed_multipart::{FieldData, TryFromMultipart, TypedMultipart};
use tempfile::NamedTempFile;
use tokio::fs;
use utoipa::ToSchema;
use uuid::Uuid;

use crate::{
    database::{self, video::CreateVideo},
    state::ApiState,
    util::{self, auth::Claims, walrus},
};

#[derive(TryFromMultipart, ToSchema)]
pub struct UploadRequest {
    #[form_data(limit = "10MiB")]
    #[schema(value_type = Vec<u8>)]
    video: FieldData<NamedTempFile>,
    #[form_data(limit = "10MiB")]
    #[schema(value_type = Vec<u8>)]
    thumbnail: FieldData<Bytes>,
    title: String,
    description: String,
}

#[utoipa::path(
    post,
    tag = "Video",
    path = "/video",
    request_body(content_type = "multipart/form-data", content = UploadRequest),
    responses(
        (status = 200, body = Uuid),
    ),
    security(("jwt_token" = []))
)]
pub async fn upload(
    state: State<Arc<ApiState>>,
    claims: Claims,
    TypedMultipart(request): TypedMultipart<UploadRequest>,
) -> crate::error::Result<Json<Uuid>> {
    let (duration, video_file) = tokio::try_join!(
        util::video::get_duration(request.video.contents.path()),
        async {
            fs::read(request.video.contents.path())
                .await
                .map_err(anyhow::Error::from)
        }
    )?;

    tracing::info!(duraion = duration);

    let (video_blob_id, thumbnail_blob_id) = tokio::try_join!(
        walrus::upload(video_file),
        walrus::upload(request.thumbnail.contents)
    )?;

    tracing::info!(video_blob_id = video_blob_id);
    tracing::info!(thumbnail_blob_id = thumbnail_blob_id);

    let id = database::video::create(
        &CreateVideo {
            video_blob_id,
            thumbnail_blob_id,
            title: request.title,
            description: request.description,
            uploader_id: claims.sub,
            duration,
        },
        &state.database_pool,
    )
    .await?;

    Ok(Json(id))
}
