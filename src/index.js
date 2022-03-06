import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import TodosContext from './context';
import todosReducer from './reducer';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

import "./index.css";

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <div className="container p-2 md:p-8 lg:p-12 mx-auto max-w-lg text-center font-mono">
        <TodoForm />
        <TodoList />
      </div>
    </TodosContext.Provider>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
