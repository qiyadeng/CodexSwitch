use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TokenData {
    pub access_token: String,
    pub refresh_token: String,
    pub expires_in: i64,
    pub expiry_timestamp: i64,
    pub token_type: String,
    pub email: Option<String>,
    /// Google Cloud 项目ID，用于 API 请求标识
    #[serde(skip_serializing_if = "Option::is_none")]
    pub project_id: Option<String>,
    /// 对齐 Antigravity IDE.app 的 CloudCode 域名选择逻辑（GCP ToS 账号走 prod）
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub is_gcp_tos: Option<bool>,
    /// 获取/刷新当前 Token 时使用的 OAuth client。
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub oauth_client_key: Option<String>,
    /// OAuth 返回的 ID Token，写入 Antigravity IDE 本地登录态。
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub id_token: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub session_id: Option<String>,
}

impl TokenData {
    pub fn new(
        access_token: String,
        refresh_token: String,
        expires_in: i64,
        email: Option<String>,
        project_id: Option<String>,
        session_id: Option<String>,
    ) -> Self {
        let expiry_timestamp = chrono::Utc::now().timestamp() + expires_in;
        Self {
            access_token,
            refresh_token,
            expires_in,
            expiry_timestamp,
            token_type: "Bearer".to_string(),
            email,
            project_id,
            is_gcp_tos: None,
            oauth_client_key: None,
            id_token: None,
            session_id,
        }
    }

    pub fn with_oauth_metadata(
        mut self,
        oauth_client_key: Option<String>,
        id_token: Option<String>,
    ) -> Self {
        self.oauth_client_key = oauth_client_key;
        self.id_token = id_token;
        self
    }
}
