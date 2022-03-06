import React from "react";
import { useSelector, useDispatch } from "react-redux";

export default function TodoList() {
  //react-redux
  let { status, todoArr, newTodo } = useSelector((state) => state.todoReducer);
  let dispatch = useDispatch();
  //function
  const handleDelete = (curID) => {
    dispatch({
      type: "DELETE",
      payload: curID,
    });
  };
  const handleEdit = (curID) => {
    dispatch({
      type: "EDIT",
      payload: curID,
    });
  };
  const handleComplete = (curID, item) => {
    dispatch({
      type: "COMPLETE",
      payload: curID,
    });
  };
  const renderTodo = () => {
    return newTodo.map((todo) => {
      return (
        <li key={todo.id} className=" mb-2 row">
          <span
            onClick={() => {
              handleComplete(todo.id, todo);
            }}
            className="hover:line-through col-7 text-3xl font-medium"
            style={{
              cursor: "pointer",
            }}
          >
            {todo.text}
          </span>

          <div className="col-4">
            <button
              className="btn btn-success mr-2"
              onClick={() => {
                handleEdit(todo.id);
              }}
            >
              <i className="fa fa-edit"></i>
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                handleDelete(todo.id);
              }}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </li>
      );
    });
  };
  return (
    <div className="mt-5">
      <ul>{renderTodo()}</ul>
    </div>
  );
}
