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
    let child = Command::new(BINARY).args(ARGS).arg(path.as_ref()).spawn()?;

    let output = child.wait_with_output().await?.stdout;
    let duration = String::from_utf8(output)?.parse()?;

    Ok(duration)
}
