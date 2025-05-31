CREATE TABLE IF NOT EXISTS videos(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    video_blob_id text NOT NULL,
    thumbnail_blob_id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    uploader_id uuid NOT NULL REFERENCES accounts(id),
    duration int NOT NULL,
    view_count int NOT NULL DEFAULT 0,
    like_count int NOT NULL DEFAULT 0,
    dislike_count int NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);
