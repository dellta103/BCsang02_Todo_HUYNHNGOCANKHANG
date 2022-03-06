import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function Todo() {
  return (
    <div className="p-5 rounded-3xl container max-w-lg bg-light min-h-screen">
      <h1 className="display-4 font-semibold">Todo list</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}
