import React from 'react';

const TodosContext = React.createContext({
  todos: [],
  activeTodo: {},
});

export default TodosContext;
