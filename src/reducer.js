export default function reducer(state, action) {
  switch (action.type) {
    case "GET_ITEMS": {
      return { ...state, todos: action.payload };
    }
    case "ADD_ITEM": {
      const todos = [ ...state.todos, action.payload ];
      return { ...state, todos };
    }
    case "SET_CURRENT_ITEM":
      return { ...state, activeTodo: action.payload };
    case "TOGGLE_ITEM": {
      const todos = state.todos.map(t =>
        t.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : t
        );
      return { ...state, todos };
    }
    case "UPDATE_ITEM": {
      const updatedTodo = { ...state.activeTodo, text: action.payload };
      const todos = state.todos.map(t =>
        t.id === updatedTodo.id ? updatedTodo : t
      );
      return { ...state, activeTodo: {}, todos };
    }
    case "REMOVE_ITEM": {
      const todos = state.todos.filter(t => t.id !== action.payload.id);
      const removedTodo = state.activeTodo.id === action.payload.id
        ? {}
        : state.activeTodo;
      return { ...state, activeTodo: removedTodo, todos };
    }
    default:
      return state;
  }
}
