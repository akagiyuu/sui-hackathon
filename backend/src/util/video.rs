use std::path::Path;

use anyhow::Result;
use tokio::process::Command;

const BINARY: &str = "ffprobe";
const ARGS: &[&str] = &[
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=noprint_wrappers=1:nokey=1",
];

pub async fn get_duration(path: impl AsRef<Path>) -> Result<i32> {
    let output = Command::new(BINARY)
        .args(ARGS)
        .arg(path.as_ref())
        .output()
        .await?;

    let stdout = String::from_utf8(output.stdout)?;

    let duration = stdout.trim().parse::<f32>()?;

    Ok(duration.round() as i32)
}
