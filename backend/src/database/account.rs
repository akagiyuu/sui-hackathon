use sqlx::{PgExecutor, Result};
use uuid::Uuid;

pub async fn create(email: &str, name: &str, executor: impl PgExecutor<'_>) -> Result<Uuid> {
    sqlx::query_scalar!(
        r#"
            INSERT INTO accounts(email, name)
            VALUES(
                $1,
                $2
            )
            RETURNING id
        "#,
        email,
        name,
    )
    .fetch_one(executor)
    .await
}

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
