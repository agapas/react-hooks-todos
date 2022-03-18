import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import TodosContext from '../context';

export default function TodoForm() {
  const lastActiveTodo = useRef({});
  const [todo, setTodo] = useState("");
  const { state: { activeTodo = {}, todos }, dispatch } = useContext(TodosContext);

  useEffect(() => {
    if (lastActiveTodo.id !== activeTodo.id && activeTodo.text) {
      setTodo(activeTodo.text);
      lastActiveTodo.current = activeTodo;
    }
    // reset todo when the active item is deleted
    if (lastActiveTodo.current.id && !activeTodo.id) {
      setTodo("");
    }
  }, [activeTodo]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (activeTodo.text) {
      dispatch({ type: "UPDATE_ITEM", payload: todo });
      setTodo("");
    }
    else {
      if (!todo || todos.some(t => t.text === todo)) { 
        return;
      }
  
      const response = await axios({
        method: "POST",
        url: "http://localhost:3001/todos/",
        data: {
          id: uuidv4(),
          text: todo,
          complete: false,
        }
      });
      dispatch({ type: "ADD_ITEM", payload: response.data });
      setTodo("");
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row justify-center mx-1 md:mx-0 pt-8 md:pt-0 pb-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="px-2 py-1 md:mx-1 md:w-5/6 border-yellow-600 border rounded"
        value={todo}
        onChange={event => setTodo(event.target.value)}
      />
      <button
        className="md:w-1/6 p-1 mt-1 md:mt-0 rounded text-white bg-yellow-600"
        type="submit"
      >Add</button>
    </form>
  );
}
