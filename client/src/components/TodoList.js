import { useState, useEffect } from "react";
import Edit from "./Edit";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const api = process.env.REACT_APP_API;
  const getTodos = async () => {
    const response = await fetch(`${api}/todos`);
    const todos = await response.json();
    setTodos(todos);
  };
  useEffect(() => {
    getTodos();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${api}/todos/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      // console.log(data);
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ul className="unordered_list">
      {todos.map((todo) => (
        <li key={todo.todo_id}>
          <h3>{todo.todo}</h3>
          <Edit todo={todo} />
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(todo.todo_id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
