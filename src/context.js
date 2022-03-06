import React from 'react';

const TodosContext = React.createContext({
  todos: [
    { id: 1, text: "Book plane tickets", complete: false },
    { id: 2, text: "Order pizza for lunch", complete: false },
    { id: 3, text: "Complete project", complete: true },
  ],
  activeTodo: {},
});

export default TodosContext;
