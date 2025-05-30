CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS accounts(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email varchar(128) UNIQUE NOT NULL,
    password varchar(72) NOT NULL
);
