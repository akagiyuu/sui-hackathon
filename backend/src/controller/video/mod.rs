mod get;
mod get_all;
mod upload;

use std::sync::Arc;

use axum::{Router, routing};
use chrono::{DateTime, Utc};
use serde::Serialize;
use sqlx::PgExecutor;
use utoipa::ToSchema;
use uuid::Uuid;

use crate::{database, error::Result, state::ApiState, util::walrus};

pub use get::*;
pub use get_all::*;
pub use upload::*;

#[derive(Serialize, ToSchema)]
pub struct Video {
    pub id: Uuid,
    pub video: String,
    pub thumbnail: String,
    pub title: String,
    pub description: String,
    pub uploader_email: String,
    pub uploader_name: String,
    pub duration: i32,
    pub view_count: i32,
    pub like_count: i32,
    pub dislike_count: i32,
    pub created_at: DateTime<Utc>,
}

impl Video {
    async fn from_raw(raw: database::video::Video, executor: impl PgExecutor<'_>) -> Result<Self> {
        let video = walrus::generate_link(&raw.video_blob_id);
        let thumbnail = walrus::generate_link(&raw.thumbnail_blob_id);
        let uploader = database::account::get(raw.uploader_id, executor).await?;

        Ok(Self {
            id: raw.id,
            video,
            thumbnail,
            title: raw.title,
            description: raw.description,
            uploader_email: uploader.email,
            uploader_name: uploader.name,
            duration: raw.duration,
            view_count: raw.view_count,
            like_count: raw.like_count,
            dislike_count: raw.dislike_count,
            created_at: raw.created_at,
        })
    }
}

pub fn build() -> Router<Arc<ApiState>> {
    Router::new()
        .route("/video", routing::post(upload))
        .route("/video/{id}", routing::get(get))
        .route("/video", routing::get(get_all))
}
