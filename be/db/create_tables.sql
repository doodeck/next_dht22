-- create_tables.sql

-- also run FIRST:
--   credentials.sql

CREATE TABLE weather ( -- external weather
    key SERIAL PRIMARY KEY,
    ts timestamp default now(), -- when inserted into DB
    temp real,
    hum real,
    pressure smallint
);
INSERT INTO weather (key, ts, temp, hum, pressure) VALUES (0, '1/1/70'::timestamp, 0., 0., 0); -- key value important - default foreign key

CREATE TABLE measurements ( -- internal temperature and humidity
    ts timestamp default now(), -- when inserted into DB
    -- 0.0.1: id char(12), -- board id - MAC address
    /* 0.0.2 */ id_key INTEGER REFERENCES credentials_ids(key),
    gpio smallint, -- gpio input id
    temp real, -- temperature
    hum real, -- humidity
    /* 0.0.4 */ weather_key INTEGER REFERENCES weather(key) DEFAULT 0
);

-- not so important, but still used for test purpose:
CREATE TABLE test_table (id integer , name text);
INSERT INTO test_table VALUES (1, 'hello database');
INSERT INTO test_table VALUES (2, 'greeting postgresql');
