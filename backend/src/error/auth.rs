use axum::{Json, http::StatusCode, response::IntoResponse};

use super::ErrorResponse;

#[derive(Debug, thiserror::Error)]
pub enum AuthError {
    #[error("Missing authentication token")]
    MissingAuthToken,

    #[error("Invalid authentication token")]
    InvalidAuthToken,
}

impl IntoResponse for AuthError {
    fn into_response(self) -> axum::response::Response {
        let status = match self {
            AuthError::MissingAuthToken => StatusCode::UNAUTHORIZED,
            AuthError::InvalidAuthToken => StatusCode::UNAUTHORIZED,
        };

        let response = ErrorResponse {
            message: self.to_string(),
        };

        (status, Json(response)).into_response()
    }
}
