import "./App.css";

import { Button } from "react-bootstrap";
import TodoList from "./components/TodoList";
import { defaultTodos } from "./data";

function App() {
  return (
    <div className="container">
      <h1>Todo App Example</h1>
      <Button className="mt-2 mb-2">Add Todo</Button>
      <TodoList
        todos={defaultTodos}
        // toggleComplete={toggleComplete}
        // deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
