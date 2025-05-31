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

fn default_google_issuer_url() -> String {
    "https://accounts.google.com".to_string()
}

fn default_google_redirect_url() -> String {
    "http://localhost:3000/auth/google/authorized".to_string()
}

fn default_microsoft_issuer_url() -> String {
    "https://login.microsoftonline.com/f4d237b6-67c2-4335-905c-56dec4c015bc/v2.0".to_string()
}

fn default_microsoft_redirect_url() -> String {
    "http://localhost:3000/auth/microsoft/authorized".to_string()
}

fn default_walrus_publisher() -> String {
    "https://publisher.walrus-testnet.walrus.space".to_string()
}

fn default_walrus_aggregator() -> String {
    "https://aggregator.walrus-testnet.walrus.space".to_string()
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
    #[serde(default = "default_google_issuer_url")]
    pub google_issuer_url: String,
    #[serde(default = "default_google_redirect_url")]
    pub google_redirect_url: String,

    pub microsoft_client_id: String,
    pub microsoft_client_secret: String,
    #[serde(default = "default_microsoft_issuer_url")]
    pub microsoft_issuer_url: String,
    #[serde(default = "default_microsoft_redirect_url")]
    pub microsoft_redirect_url: String,

    #[serde(default = "default_walrus_publisher")]
    pub walrus_publisher: String,
    #[serde(default = "default_walrus_aggregator")]
    pub walrus_aggregator: String,
}

pub static CONFIG: LazyLock<Config> = LazyLock::new(|| {
    ::config::Config::builder()
        .add_source(::config::Environment::default().try_parsing(true))
        .build()
        .unwrap()
        .try_deserialize()
        .unwrap()
});
