CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)

INSERT INTO
    post (title, description)
VALUES (
        "Bagaimana cara membangun LMS",
        "Bangun LMS dengan menggunakan React dan Express JS"
    );