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

INSERT INTO
    post (title, description)
VALUES (
        "Bagaimana cara membangun Frontend",
        "Bangun Frontend dengan menggunakan React dan TypeScript"
    );