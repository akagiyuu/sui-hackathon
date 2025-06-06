use chrono::{DateTime, Utc};
use futures::Stream;
use serde::Deserialize;
use sqlx::{PgExecutor, Result};
use utoipa::ToSchema;
use uuid::Uuid;

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

pub struct Video {
    pub id: Uuid,
    pub video_blob_id: String,
    pub thumbnail_blob_id: String,
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
    sqlx::query_as!(
        Video,
        r#"
            SELECT
                id,
                video_blob_id,
                thumbnail_blob_id,
                title,
                description,
                uploader_id,
                duration,
                view_count,
                like_count,
                dislike_count,
                created_at
            FROM videos
            WHERE id = $1
        "#,
        id
    )
    .fetch_optional(executor)
    .await
}

pub fn get_by_account<'a>(account_id: Uuid, executor: impl PgExecutor<'a> + 'a) -> impl Stream<Item = Result<Video>> {
    sqlx::query_as!(
        Video,
        r#"
            SELECT
                id,
                video_blob_id,
                thumbnail_blob_id,
                title,
                description,
                uploader_id,
                duration,
                view_count,
                like_count,
                dislike_count,
                created_at
            FROM videos
            WHERE uploader_id = $1
        "#,
        account_id
    )
    .fetch(executor)
}

pub async fn query_all(query: Option<&str>, executor: impl PgExecutor<'_>) -> Result<Vec<Video>> {
    sqlx::query_as!(
        Video,
        r#"
            SELECT
                id,
                video_blob_id,
                thumbnail_blob_id,
                title,
                description,
                uploader_id,
                duration,
                view_count,
                like_count,
                dislike_count,
                created_at
            FROM videos
            WHERE
              ($1::text IS NULL OR $1::text = '')
              OR search_vector @@ plainto_tsquery('english', $1::text)
            ORDER BY ts_rank(search_vector, plainto_tsquery('english', $1::text)) DESC
        "#,
        query
    )
    .fetch_all(executor)
    .await
}

pub async fn increase_view(id: Uuid, executor: impl PgExecutor<'_>) -> Result<()> {
    sqlx::query!(
        r#"
            UPDATE videos
            SET view_count = view_count + 1
            WHERE id = $1
        "#,
        id
    )
    .execute(executor)
    .await?;

    Ok(())
}

#[derive(Clone, Copy, Deserialize, ToSchema)]
#[serde(rename_all = "snake_case")]
pub enum ReactionKind {
    Like,
    Dislike,
}

pub async fn react(
    id: Uuid,
    reaction_kind: ReactionKind,
    executor: impl PgExecutor<'_>,
) -> Result<()> {
    let query = match reaction_kind {
        ReactionKind::Like => sqlx::query!(
            r#"
                UPDATE videos
                SET like_count = like_count + 1
                WHERE id = $1
            "#,
            id
        ),
        ReactionKind::Dislike => sqlx::query!(
            r#"
                UPDATE videos
                SET dislike_count = dislike_count + 1
                WHERE id = $1
            "#,
            id
        ),
    };

    query.execute(executor).await?;

    Ok(())
}
