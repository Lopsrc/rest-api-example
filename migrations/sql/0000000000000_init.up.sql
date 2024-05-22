CREATE TABLE IF NOT EXISTS person
(
    id              SERIAL PRIMARY KEY,
    name            TEXT  NOT NULL,
    email           TEXT NOT NULL UNIQUE,
    age             INTEGER NOT NULL,
    del             BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS idx_email ON person (email);

CREATE TABLE IF NOT EXISTS car
(
    id              SERIAL PRIMARY KEY,
    brand           TEXT NOT NULL ,
    model           TEXT NOT NULL ,
    color           TEXT NOT NULL,
    reg_num         TEXT NOT NULL UNIQUE,
    person_id       INTEGER REFERENCES person(id)
);