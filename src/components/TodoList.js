import React, { useContext } from 'react';
import TodosContext from '../context';

export default function TodoList() {
  const { state } = useContext(TodosContext);
  const title = state.todos.length
    ? `${state.todos.length} Todos:`
    : "There is nothing to do!" ;

  return (
    <div className="container p-2 md:p-8 lg:p-12 mx-auto max-w-lg text-center font-mono">
      <h1 className="p-2 text-3xl font-bold text-green-700">{title}</h1>
      <ul>
        {state.todos.map(todo => {
          const bgColor = todo.complete ? "green-600" : "yellow-500";
          const darkerColor = todo.complete ? "green-700" : "yellow-600";
          return (
          <li
            key={todo.id}
            className="p-1 my-2 max-w-lg flex items-center text-green-700"
          >
            <span className={`flex-1 mr-3 text-white bg-${bgColor} hover:bg-${darkerColor} border-${darkerColor} border rounded`}>{todo.text}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 cursor-pointer text-blue-800" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </li>
        )})}
      </ul>
    </div>
  );
}
