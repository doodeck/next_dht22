-- credentials.js

CREATE TABLE credentials_ids (
    key SERIAL PRIMARY KEY,
    id char(12) -- board id - MAC address
);

-- must match the environment variable AUTH_IDS
INSERT INTO credentials_ids VALUES (1, '************');
INSERT INTO credentials_ids VALUES (2, '************');
