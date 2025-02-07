import "./App.css";

import { Alert, Button, Form } from "react-bootstrap";
import { ChangeEvent, useEffect, useState } from "react";

import TodoList from "./components/TodoList";
import { defaultTodos } from "./data";

function App() {
  const [todos, setTodos] = useState(defaultTodos);
  const [newTodo, setNewTodo] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log({ e });
    // console.log({ inputValue: e.target.value, inputName: e.target.name });
    setNewTodo(e.target.value);
  };

  const addTodo = () => {
    if (!newTodo) {
      setShowAlert(true);
      return;
    }

    const newTodoItem = {
      id: todos.length + 1,
      title: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo("");
  };

  const toggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      {showAlert && (
        <Alert
          variant="danger"
          style={{ marginTop: "15px" }}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {/* <Alert.Heading>Oh snap! You got an error!</Alert.Heading> */}
          <p>
            Please enter a task before adding it to the list! The task cannot be
            empty.
          </p>
        </Alert>
      )}
      <h1>Todo App Example</h1>
      <Form.Control
        type="text"
        value={newTodo}
        onChange={handleChange}
        placeholder="Enter a task"
      />
      <Button className="mt-2 mb-2" onClick={addTodo}>
        Add Todo
      </Button>
      <TodoList
        todos={todos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
