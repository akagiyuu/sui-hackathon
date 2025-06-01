ALTER TABLE videos
ADD COLUMN search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english', title || ' ' || description)
) STORED;

CREATE INDEX videos_search_vector_idx ON videos USING GIN (search_vector);
