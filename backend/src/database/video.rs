use chrono::{DateTime, Utc};
use futures::Stream;
use serde::Serialize;
use sqlx::{PgExecutor, Result};
use utoipa::ToSchema;
use uuid::Uuid;

use crate::util::walrus;

pub struct CreateVideo {
    pub video_blob_id: String,
    pub thumbnail_blob_id: String,
    pub title: String,
    pub description: String,
    pub uploader_id: Uuid,
    pub duration: i32,
}

pub async fn create(params: &CreateVideo, executor: impl PgExecutor<'_>) -> Result<Uuid> {
    sqlx::query_scalar!(
        r#"
            INSERT INTO videos(
                video_blob_id,
                thumbnail_blob_id,
                title,
                description,
                uploader_id,
                duration
            ) VALUES($1, $2, $3, $4, $5, $6)
            RETURNING id
        "#,
        params.video_blob_id,
        params.thumbnail_blob_id,
        params.title,
        params.description,
        params.uploader_id,
        params.duration,
    )
    .fetch_one(executor)
    .await
}

#[derive(Serialize, ToSchema)]
pub struct Video {
    pub id: Uuid,
    pub video_link: String,
    pub thumbnail_link: String,
    pub title: String,
    pub description: String,
    pub uploader_id: Uuid,
    pub duration: i32,
    pub view_count: i32,
    pub like_count: i32,
    pub dislike_count: i32,
    pub created_at: DateTime<Utc>,
}

pub async fn get(id: Uuid, executor: impl PgExecutor<'_>) -> Result<Option<Video>> {
    sqlx::query!("SELECT * FROM videos WHERE id = $1", id)
        .map(|raw| Video {
            id: raw.id,
            video_link: walrus::generate_link(&raw.video_blob_id),
            thumbnail_link: walrus::generate_link(&raw.thumbnail_blob_id),
            title: raw.title,
            description: raw.description,
            uploader_id: raw.uploader_id,
            duration: raw.duration,
            view_count: raw.view_count,
            like_count: raw.like_count,
            dislike_count: raw.dislike_count,
            created_at: raw.created_at,
        })
        .fetch_optional(executor)
        .await
}

pub fn get_all<'a>(executor: impl PgExecutor<'a> + 'a) -> impl Stream<Item = Result<Video>> {
    sqlx::query!("SELECT * FROM videos")
        .map(|raw| Video {
            id: raw.id,
            video_link: walrus::generate_link(&raw.video_blob_id),
            thumbnail_link: walrus::generate_link(&raw.thumbnail_blob_id),
            title: raw.title,
            description: raw.description,
            uploader_id: raw.uploader_id,
            duration: raw.duration,
            view_count: raw.view_count,
            like_count: raw.like_count,
            dislike_count: raw.dislike_count,
            created_at: raw.created_at,
        })
        .fetch(executor)
}
