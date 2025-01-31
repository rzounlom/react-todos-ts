import "./Todo.css";

import { Button } from "react-bootstrap";
import { TodoItem } from "../types";

type TodoProps = {
  todo: TodoItem;
  toggleComplete: (id: number) => void;
};

export default function Todo({ todo, toggleComplete }: TodoProps) {
  return (
    <div className="todo">
      <p className={todo?.completed ? "todo-title-completed " : ""}>
        {todo?.title}
      </p>
      <div className="btn-group">
        <Button
          variant="outline-primary"
          onClick={() => toggleComplete(todo?.id)}
        >
          {todo?.completed ? "Undo" : "Complete"}
        </Button>
        <Button variant="outline-danger">Delete</Button>
      </div>
    </div>
  );
}
