import { useState } from "react";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { TodoControls } from "./TodoControls";
import { TodoList } from "./TodoList";
import {
  getVisibleTodos,
  type TodoFilterMode,
  type TodoSortMode,
  useTodoState,
} from "./todos";

export const Home = () => {
  const [todos, dispatch] = useTodoState();
  const [filterMode, setFilterMode] = useState<TodoFilterMode>("all");
  const [sortMode, setSortMode] = useState<TodoSortMode>("newest");

  const visibleTodos = getVisibleTodos(todos, filterMode, sortMode);
  const openCount = todos.filter((todo) => !todo.isDone).length;

  return (
    <VStack as="section" gap={5} hAlign="start">
      <VStack gap={1} width="100%">
        <Heading level={1}>Todos</Heading>
        <Text as="p" color="secondary">
          Track open work, update it inline, and filter the list without leaving the page.
        </Text>
        <Text as="p" color="secondary" type="supporting">
          {openCount} open of {todos.length} total
        </Text>
      </VStack>

      <TodoControls
        filterMode={filterMode}
        onAddTodo={(title) => dispatch({ type: "add", title })}
        onFilterChange={setFilterMode}
        onSortChange={setSortMode}
        sortMode={sortMode}
      />

      <TodoList
        onDeleteTodo={(id) => dispatch({ type: "remove", id })}
        onRenameTodo={(id, title) => dispatch({ type: "rename", id, title })}
        onToggleTodoDone={(id, isDone) => dispatch({ type: "setDone", id, isDone })}
        todos={todos}
        visibleTodos={visibleTodos}
      />
    </VStack>
  );
};
