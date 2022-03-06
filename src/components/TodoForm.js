import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";

export default function TodoForm() {
  //useState
  const [input, setInput] = useState("");
  const [filteredTodos, setFilteredTodos] = useState([]);
  //react-redux
  let { status, todoArr, inputText, cloneTodo, disable, newTodo, save } =
    useSelector((state) => state.todoReducer);
  let dispatch = useDispatch();
  //useEffect
  useEffect(() => {
    getLocal();
  }, []);
  useEffect(() => {
    setInput(inputText);
  }, [cloneTodo.text]);
  useEffect(() => {
    handleFilter();
    saveLocal();
  }, [status, todoArr, cloneTodo]);
  useEffect(() => {
    saveLocal();
  }, [save]);
  //functions
  const handleInput = (e) => {
    setInput(e.target.value);
    document.getElementById("errText").innerText = "";
  };
  const handleAdd = (e) => {
    e.preventDefault();
    if (!validator.isEmpty(input)) {
      if (todoArr.length > 0) {
        let index = todoArr.findIndex((todo) => {
          return todo.text === input;
        });
        if (index === -1) {
          dispatch({
            type: "ADD",
            payload: {
              id: Math.random() * 1000,
              text: input,
              isDone: false,
            },
            text: input,
          });
          saveLocal();
        } else {
          document.getElementById("errText").innerText = "Todo bị trùng!";
        }
      } else if (todoArr.length === 0) {
        dispatch({
          type: "ADD",
          payload: {
            id: Math.random() * 1000,
            text: input,
            isDone: false,
          },
          text: input,
        });
        saveLocal();
      }
    } else {
      document.getElementById("errText").innerText = "Vui lòng nhập lại!";
    }
    setInput("");
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch({
      type: "UPDATE",
      payload: input,
    });
    setInput(inputText);
  };
  const handleStatus = (value) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: value,
    });
    saveLocal();
    setInput("");
  };
  const handleFilter = () => {
    dispatch({
      type: "FILTER",
    });
  };
  const saveLocal = () => {
    localStorage.setItem("todo", JSON.stringify(todoArr));
  };
  const getLocal = () => {
    if (localStorage.getItem("todo") !== null) {
      let todoLocal = JSON.parse(localStorage.getItem("todo"));
      dispatch({
        type: "GET_LOCAL",
        payload: todoLocal,
      });
    } else {
      localStorage.setItem("todo", JSON.stringify(todoArr));
    }
  };
  return (
    <form className="mt-3">
      <div className="input-group row ">
        <input
          type="text"
          className="form-control col-7"
          onChange={(e) => {
            handleInput(e);
          }}
          value={input}
        />
        <select
          className="form-control col-3"
          onChange={(e) => {
            handleStatus(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="done">Done</option>
          <option value="undone">Undone</option>
        </select>
        <button
          onClick={handleAdd}
          className="btn btn-success col-1 d-flex justify-center items-center "
        >
          <i className="fa fa-plus"></i>
        </button>
        <button
          onClick={handleUpdate}
          disabled={!disable}
          className="btn btn-primary col-1 d-flex justify-center items-center "
        >
          <i className="fa fa-sync"></i>
        </button>
      </div>
      <span className="text-danger font-medium" id="errText"></span>
    </form>
  );
}
