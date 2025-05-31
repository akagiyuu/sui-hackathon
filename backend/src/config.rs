use std::sync::LazyLock;

use serde::Deserialize;

const fn default_port() -> u16 {
    3000
}

fn default_jwt_secret() -> String {
    "secret".to_string()
}

const fn default_jwt_expired_in() -> u64 {
    24 * 60 * 60
}

#[derive(Deserialize)]
pub struct Config {
    #[serde(default = "default_port")]
    pub port: u16,

    pub database_url: String,

    #[serde(default = "default_jwt_secret")]
    pub jwt_secret: String,
    #[serde(default = "default_jwt_expired_in")]
    pub jwt_expired_in: u64,

    pub google_client_id: String,
    pub google_client_secret: String,
    pub google_issuer_url: String,
    pub google_redirect_url: String,

    pub microsoft_client_id: String,
    pub microsoft_client_secret: String,
    pub microsoft_issuer_url: String,
    pub microsoft_redirect_url: String,
}

pub static CONFIG: LazyLock<Config> = LazyLock::new(|| {
    ::config::Config::builder()
        .add_source(::config::Environment::default().try_parsing(true))
        .build()
        .unwrap()
        .try_deserialize()
        .unwrap()
});
