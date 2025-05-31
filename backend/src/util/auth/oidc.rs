use std::ops::Deref;

use anyhow::{Context, Result, ensure};
use openidconnect::{
    AuthenticationFlow, AuthorizationCode, ClientId, ClientSecret, CsrfToken, EndpointMaybeSet,
    EndpointNotSet, EndpointSet, IssuerUrl, Nonce, RedirectUrl, Scope,
    core::{
        CoreClient, CoreIdTokenClaims, CoreIdTokenVerifier, CoreProviderMetadata, CoreResponseType,
    },
    reqwest,
    url::Url,
};

type InnerClient = CoreClient<
    EndpointSet,
    EndpointNotSet,
    EndpointNotSet,
    EndpointNotSet,
    EndpointMaybeSet,
    EndpointMaybeSet,
>;

pub struct OpenIdConnectClient(InnerClient);

impl Deref for OpenIdConnectClient {
    type Target = InnerClient;

    fn deref(&self) -> &Self::Target {
        &self.0
    }
}

impl From<InnerClient> for OpenIdConnectClient {
    fn from(value: InnerClient) -> Self {
        OpenIdConnectClient(value)
    }
}

impl OpenIdConnectClient {
    pub async fn new(
        client_id: String,
        client_secret: String,
        issuer_url: String,
        redirect_url: String,
        http_client: &reqwest::Client,
    ) -> Result<Self> {
        let client_id = ClientId::new(client_id);
        let client_secret = ClientSecret::new(client_secret);
        let issuer_url = IssuerUrl::new(issuer_url)?;

        let provider_metadata =
            CoreProviderMetadata::discover_async(issuer_url, http_client).await?;

        Ok(
            CoreClient::from_provider_metadata(provider_metadata, client_id, Some(client_secret))
                .set_redirect_uri(RedirectUrl::new(redirect_url)?)
                .into(),
        )
    }
    pub fn generate(&self) -> (Url, CsrfToken, Nonce) {
        self.authorize_url(
            AuthenticationFlow::<CoreResponseType>::AuthorizationCode,
            CsrfToken::new_random,
            Nonce::new_random,
        )
        .add_scope(Scope::new("email".to_string()))
        .add_scope(Scope::new("profile".to_string()))
        .url()
    }

    pub async fn get_claims(
        &self,
        code: AuthorizationCode,
        state: CsrfToken,
        csrf: CsrfToken,
        nonce: Nonce,
        http_client: &reqwest::Client,
    ) -> Result<CoreIdTokenClaims> {
        ensure!(state.secret() == csrf.secret(), "Invalid redirect");

        let token_response = self.exchange_code(code)?.request_async(http_client).await?;

        let id_token_verifier: CoreIdTokenVerifier = self.id_token_verifier();
        let id_token_claims: &CoreIdTokenClaims = token_response
            .extra_fields()
            .id_token()
            .context("Missing id token")?
            .claims(&id_token_verifier, &nonce)?;

        Ok(id_token_claims.clone())
    }
}
