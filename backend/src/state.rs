use std::sync::Arc;

pub struct ApiState {}

impl ApiState {
    pub async fn new() -> Arc<Self> {
        Arc::new(Self {})
    }
}
