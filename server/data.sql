-- CREATE DATABASE my_todos;

CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY,
    todo VARCHAR(255) NOT NULL
);

