CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
 
CREATE TABLE IF NOT EXISTS application_login(
  userId userId DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (userId)
)
 
INSERT INTO application_login (email, password) VALUES ('tiago@teste.com', crypt( 'admin', 'my_salt'));

