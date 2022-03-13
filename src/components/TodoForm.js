import React, { useState, useContext, useEffect, useRef } from 'react';
import TodosContext from '../context';

export default function TodoForm() {
  const lastActiveTodo = useRef({});
  const [todo, setTodo] = useState("");
  const { state: { activeTodo = {} }, dispatch } = useContext(TodosContext);

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

  const handleSubmit = event => {
    event.preventDefault();

    const type = activeTodo.text ? "UPDATE_ITEM" : "ADD_ITEM";
    dispatch({ type, payload: todo });
    setTodo("");
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
