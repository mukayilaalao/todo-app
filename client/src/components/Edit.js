import { Fragment, useState } from "react";

function Edit({ todo }) {
  const [todoToUpdate, setUpdate] = useState(todo.todo);
  const api = process.env.REACT_APP_API;
  const handleChange = (e) => {
    setUpdate(e.target.value);
  };
  const handleSave = async () => {
    try {
      const body = { todo: todoToUpdate };
      const response = await fetch(`${api}/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      // console.log(data);
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-primary"
        data-toggle="modal"
        data-target={`#${todo.todo_id}`}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={todo.todo_id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={todo.todo_id + "Label"}>
                Edit todo
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={todoToUpdate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Edit;
