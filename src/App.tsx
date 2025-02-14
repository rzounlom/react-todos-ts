import "./App.css";

import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { ChangeEvent, useEffect, useState } from "react";

import { NewTodoItem } from "./types";
import TodoList from "./components/TodoList";

// import { defaultTodos } from "./data";
const BASE_URL = "https://67ae84529e85da2f020daca6.mockapi.io/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log({ e });
    // console.log({ inputValue: e.target.value, inputName: e.target.name });
    setNewTodo(e.target.value);
  };

  //API reques to retreive all todos
  const getTodos = async () => {
    setLoading(true); //set loading to true while waiting for the response
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); //set loading to false after the response
    }
  };

  //API request to add a new todo
  const addTodo = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!newTodo) {
      setShowAlert(true);
      return;
    }

    setShowAlert(false); //hide the alert in case it was shown before
    setLoading(true); //set loading to true while waiting for the response
    const todo: NewTodoItem = {
      title: newTodo,
      completed: false,
    };

    try {
      await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      await getTodos(); //fetch the updated list of todos
      setNewTodo(""); //clear the input field after adding the todo
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); //set loading to false after the response is received
    }
  };

  //API request to get a single todo
  const getTodo = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (id: string) => {
    setLoading(true); //set loading to true while waiting for the response
    const todo = await getTodo(id); //get the todo to be updated

    try {
      await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, completed: !todo.completed }), //toggle the status of the todo, but keep the other properties the same
      });
      await getTodos(); //fetch the updated list of todos
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); //set loading to false after the response is received
    }
  };

  //API request to delete a todo
  const deleteTodo = async (id: string) => {
    setLoading(true); //set loading to true while waiting for the response
    try {
      await fetch(`${BASE_URL}/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
      await getTodos(); //fetch the updated list of todos
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); //set loading to false after the response is received
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

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
      <form onSubmit={addTodo}>
        <Form.Control
          type="text"
          value={newTodo}
          onChange={handleChange}
          placeholder="Enter a task"
        />
        <Button type="submit" className="mt-2 mb-2">
          Add Todo
        </Button>
      </form>

      {loading ? (
        <div className="spinner-container">
          <Spinner variant="primary" />
        </div>
      ) : (
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      )}
    </div>
  );
}

export default App;
