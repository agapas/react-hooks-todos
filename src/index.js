import React, { useContext, useEffect, useReducer, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import TodosContext from './context';
import todosReducer from './reducer';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

import "./index.css";

const useAPI = endpoint => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(endpoint);
      setData(response.data);
    };
    getData();
  }, [endpoint]);

  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  const savedTodos = useAPI("http://localhost:3000/todos");

  useEffect(() => {
    dispatch({
      type: "GET_ITEMS",
      payload: savedTodos,
    });
  }, [savedTodos]);

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
