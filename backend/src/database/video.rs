use sqlx::{PgExecutor, Result};
use uuid::Uuid;

pub struct CreateVideo {
    pub video_blob_id: String,
    pub thumbnail_blob_id: String,
    pub title: String,
    pub description: String,
    pub uploader_id: Uuid,
    pub duration: i32,
}

pub async fn create(params: &CreateVideo, executror: impl PgExecutor<'_>) -> Result<Uuid> {
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
    .fetch_one(executror)
    .await
}
