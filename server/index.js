const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");
const port = process.env.PORT;

//middleware

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello, welcome to the backend!");
});

// get all todos
app.get("/api/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todos");
    res.json(todos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get a todo
app.get("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todos = await pool.query("SELECT * FROM todos WHERE todo_id=$1", [
      id,
    ]);
    res.json(todos.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// delete a todo
app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("DELETE FROM todos WHERE todo_id=$1", [id]);
    res.json("Todo successfully deleted");
  } catch (err) {
    console.error(err.message);
  }
});
// create a todo
app.post("/api/todos", async (req, res) => {
  try {
    const { todo } = req.body;
    const myTodo = await pool.query(
      "INSERT INTO todos(todo) VALUES($1) RETURNING *",
      [todo]
    );
    res.json(myTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//update a todo
app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;
    const updatedTodo = await pool.query(
      "UPDATE todos SET todo=$1 WHERE todo_id=$2",
      [todo, id]
    );
    res.json("Todo successfully updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
