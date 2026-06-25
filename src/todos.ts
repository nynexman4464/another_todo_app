import { useReducer } from "react";

export type Todo = {
  id: string;
  title: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TodoFilterMode = "all" | "open" | "closed";
export type TodoSortMode = "newest" | "oldest" | "updated";

type TodoAction =
  | { type: "add"; title: string }
  | { type: "rename"; id: string; title: string }
  | { type: "setDone"; id: string; isDone: boolean }
  | { type: "remove"; id: string };

function nowIso() {
  return new Date().toISOString();
}

function createTodo(title: string): Todo {
  const timestamp = nowIso();

  return {
    id: crypto.randomUUID(),
    title,
    isDone: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

function todoReducer(todos: Todo[], action: TodoAction) {
  switch (action.type) {
    case "add":
      return [createTodo(action.title), ...todos];
    case "rename":
      return todos.map((todo) =>
        todo.id === action.id
          ? {
              ...todo,
              title: action.title,
              updatedAt: nowIso(),
            }
          : todo,
      );
    case "setDone":
      return todos.map((todo) =>
        todo.id === action.id
          ? {
              ...todo,
              isDone: action.isDone,
              updatedAt: nowIso(),
            }
          : todo,
      );
    case "remove":
      return todos.filter((todo) => todo.id !== action.id);
    default:
      return todos;
  }
}

export function useTodoState(initialTodos: Todo[] = []) {
  return useReducer(todoReducer, initialTodos);
}

export function getTodoTitleValidationMessage(title: string) {
  if (!title.trim()) {
    return "Todo titles cannot be blank.";
  }

  return null;
}

export function getVisibleTodos(
  todos: Todo[],
  filterMode: TodoFilterMode,
  sortMode: TodoSortMode,
) {
  const filteredTodos = todos.filter((todo) => {
    if (filterMode === "open") {
      return !todo.isDone;
    }

    if (filterMode === "closed") {
      return todo.isDone;
    }

    return true;
  });

  return filteredTodos.toSorted((leftTodo, rightTodo) => {
    if (leftTodo.isDone !== rightTodo.isDone) {
      return leftTodo.isDone ? 1 : -1;
    }

    if (sortMode === "oldest") {
      return leftTodo.createdAt.localeCompare(rightTodo.createdAt);
    }

    if (sortMode === "updated") {
      return rightTodo.updatedAt.localeCompare(leftTodo.updatedAt);
    }

    return rightTodo.createdAt.localeCompare(leftTodo.createdAt);
  });
}
