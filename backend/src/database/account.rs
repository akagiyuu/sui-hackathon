use serde::Serialize;
use sqlx::{PgExecutor, Result};
use utoipa::ToSchema;
use uuid::Uuid;

pub async fn create(email: &str, name: &str, executor: impl PgExecutor<'_>) -> Result<()> {
    sqlx::query!(
        r#"
            INSERT INTO accounts(email, name)
            VALUES(
                $1,
                $2
            )
            ON CONFLICT DO NOTHING
        "#,
        email,
        name,
    )
    .execute(executor)
    .await?;

    Ok(())
}

pub async fn get_by_email(email: &str, executor: impl PgExecutor<'_>) -> Result<Option<Uuid>> {
    sqlx::query_scalar!("SELECT id FROM accounts WHERE email = $1", email)
        .fetch_optional(executor)
        .await
}

#[derive(Serialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct Account {
    pub email: String,
    pub name: String,
}

pub async fn get(id: Uuid, executor: impl PgExecutor<'_>) -> Result<Account> {
    sqlx::query_as!(
        Account,
        "SELECT email, name FROM accounts WHERE id = $1",
        id
    )
    .fetch_one(executor)
    .await
}
