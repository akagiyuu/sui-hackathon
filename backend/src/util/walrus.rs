use std::sync::LazyLock;

use anyhow::Result;
use reqwest::Body;
use serde::Deserialize;
use serde_json::Value;

use crate::config::CONFIG;

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct BlobObject {
    blob_id: String,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
enum UploadResponse {
    #[serde(rename_all = "camelCase")]
    NewlyCreated { blob_object: BlobObject },
    #[serde(rename_all = "camelCase")]
    AlreadyCertified { blob_id: String },
}

impl UploadResponse {
    fn into_blob_id(self) -> String {
        match self {
            UploadResponse::NewlyCreated { blob_object } => blob_object.blob_id,
            UploadResponse::AlreadyCertified { blob_id } => blob_id,
        }
    }
}

static UPLOAD_API: LazyLock<String> =
    LazyLock::new(|| format!("{}/v1/blobs", CONFIG.walrus_publisher));

pub async fn upload<T: Into<Body>>(data: T) -> Result<String> {
    let response = reqwest::Client::new()
        .put(UPLOAD_API.as_str())
        .body(data)
        .send()
        .await?;
    let response: UploadResponse = response.json().await?;

    Ok(response.into_blob_id())
}

pub fn generate_link(blob_id: &str) -> String {
    format!("{}/v1/blobs/{}", CONFIG.walrus_aggregator, blob_id)
}
