use serde::{Deserialize, Serialize};
use sqlx::{PgExecutor, Result};
use utoipa::ToSchema;
use uuid::Uuid;

use crate::util;

pub async fn create(
    email: &str,
    password: Option<String>,
    executor: impl PgExecutor<'_>,
) -> Result<Uuid> {
    let password = password.unwrap_or_else(util::auth::random_password);

    sqlx::query_scalar!(
        r#"
            INSERT INTO accounts(email, password, role_id)
            VALUES(
                $1,
                $2,
                (SELECT id FROM roles WHERE name = $3)
            )
            RETURNING id
        "#,
        email,
        password,
        role.as_ref()
    )
    .fetch_one(executor)
    .await
}
