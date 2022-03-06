const initState = {
  status: "all",
  todoArr: [],
  cloneTodo: {},
  inputText: "",
  disable: false,
  newTodo: [],
  save: true,
};
export const todoReducer = (state = initState, { type, payload, text }) => {
  switch (type) {
    case "ADD": {
      let cloneState = { ...state };
      cloneState.todoArr.push(payload);
      cloneState.inputText = text;
      cloneState.newTodo = cloneState.todoArr;
      return { ...cloneState };
    }
    case "DELETE": {
      let cloneState = { ...state };
      let index = cloneState.todoArr.findIndex((todo) => {
        return todo.id === payload;
      });
      cloneState.todoArr.splice(index, 1);
      cloneState.save = false;

      return { ...cloneState };
    }
    case "EDIT": {
      let cloneState = { ...state };
      cloneState.disable = true;
      let index = cloneState.todoArr.findIndex((todo) => {
        return todo.id === payload;
      });
      cloneState.cloneTodo = cloneState.todoArr[index];
      cloneState.inputText = cloneState.cloneTodo.text;
      return { ...cloneState };
    }
    case "UPDATE": {
      let cloneState = { ...state };
      let index = cloneState.todoArr.findIndex((todo) => {
        return todo.id === cloneState.cloneTodo.id;
      });
      cloneState.todoArr[index].text = payload;
      state.todoArr = cloneState.todoArr;
      cloneState.disable = false;
      state.inputText = state.cloneTodo.text;
      return { ...state };
    }
    case "CHANGE_STATUS": {
      let cloneState = { ...state };
      cloneState.status = payload;
      return { ...cloneState };
    }
    case "FILTER": {
      let cloneState = { ...state };
      switch (cloneState.status) {
        case "done":
          cloneState.newTodo = cloneState.todoArr.filter((todo) => {
            return todo.isDone === true;
          });
          return { ...cloneState };
        case "undone":
          cloneState.newTodo = cloneState.todoArr.filter((todo) => {
            return todo.isDone === false;
          });
          return { ...cloneState };
        default:
          cloneState.newTodo = cloneState.todoArr;
          return { ...cloneState };
      }
    }
    case "COMPLETE": {
      let cloneState = { ...state };
      let index = cloneState.todoArr.findIndex((todo) => {
        return todo.id === payload;
      });
      cloneState.todoArr[index].isDone = !cloneState.todoArr[index].isDone;
      cloneState.newTodo = cloneState.todoArr;
      state.todoArr = [...cloneState.newTodo];
      return { ...state };
    }
    case "GET_LOCAL": {
      let cloneState = { ...state };
      cloneState.todoArr = payload;
      state.todoArr = [...cloneState.todoArr];
      return { ...state };
    }

    default:
      return state;
  }
};
