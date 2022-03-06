import { v4 as uuidv4 } from 'uuid';

export default function reducer(state, action) {
  switch(action.type) {
    case "ADD_ITEM": {
      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false,
      };
      const todos = [ ...state.todos, newTodo ];
      return { ...state, todos };
    }
    case "TOGGLE_ITEM": {
      const todos = state.todos.map(t =>
        t.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : t
        );
      return { ...state, todos };
    }
    case "REMOVE_ITEM": {
      const todos = state.todos.filter(t => t.id !== action.payload.id);
      return { ...state, todos };
    }
    default:
      return state;
  }
}
