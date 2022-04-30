import React from 'react'

export function TodoItem( {todo, toggleTodo}) {
    const {id, task, completed} = todo;

    const handleTodo = () => {
        toggleTodo(id);
    };

  return (
    <li>
        <input type="checkBox" checked={completed} onChange={handleTodo}></input> {task}
    </li>
  )
}
