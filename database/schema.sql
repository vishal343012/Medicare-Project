-- Run as postgres:
-- CREATE DATABASE medical_poc;
-- CREATE USER medical_app WITH PASSWORD 'CHANGE_ME';
-- GRANT CONNECT ON DATABASE medical_poc TO medical_app;
-- Then connect to medical_poc and run this file.

CREATE TABLE IF NOT EXISTS patients (
 id SERIAL PRIMARY KEY,
 name VARCHAR(100) NOT NULL,
 condition VARCHAR(150) NOT NULL,
 status VARCHAR(50) NOT NULL
);

INSERT INTO patients(name,condition,status) VALUES
('Demo Patient A','Example Oncology Condition','Active'),
('Demo Patient B','Example Cardiology Condition','Follow-up'),
('Demo Patient C','Example Neurology Condition','Stable')
ON CONFLICT DO NOTHING;

GRANT USAGE ON SCHEMA public TO medical_app;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO medical_app;
GRANT USAGE,SELECT ON ALL SEQUENCES IN SCHEMA public TO medical_app;
