import { useState } from "react";

function Form() {
  const [userTodo, setUserTodo] = useState("");
  const api = process.env.REACT_APP_API;
  const handleChange = (e) => {
    setUserTodo(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { todo: userTodo };
      const todoPost = await fetch(`${api}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setUserTodo("");
      // console.log(todoPost.json());
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col">
          <input
            value={userTodo}
            onChange={handleChange}
            className="form-control"
            placeholder="Enter your todo..."
          />
        </div>
        <div className="col-sm-0">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default Form;
