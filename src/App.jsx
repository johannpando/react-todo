import React, {Fragment, useState, useRef, useEffect} from "react";
import { TodoList } from "./components/TodoList";
import { v4 as uuid} from "uuid";

const KEY = "appTodo.todos";

export function App () {
    // Destructuring
    // useState es un array que devuelve dos propiedades, una es el estado en sí y la otra la función que hace modificar ese estado
    const [todos, setTodos] = useState([
        //{ id: 1, task: "Task 1", completed: false }
    ]);

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if(storedTodos) {
            setTodos(storedTodos);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const todoTaskRef = useRef();   

    const handleAddTodo = () => {
        const task = todoTaskRef.current.value;

        if (task === '')
            return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: uuid(), task, completed:false}];
        });

        todoTaskRef.current.value = null;
    }

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed );
        setTodos(newTodos);
    }

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }

    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
            <input ref={todoTaskRef} type="text" placeholder="New Task" />
            <button onClick={handleAddTodo}>+</button>
            <button onClick={handleClearAll}>-</button>
            <div>Te quedan {todos.filter( (todo) => !todo.completed).length} tareas por terminar</div>
        </Fragment>
        
    );
}