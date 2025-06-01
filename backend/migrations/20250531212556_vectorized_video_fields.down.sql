DROP INDEX videos_search_vector_idx;

ALTER TABLE videos
DROP search_vector;
