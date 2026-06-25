import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { TodoItem } from "./TodoItem";
import type { Todo } from "./todos";

type TodoListProps = {
  onDeleteTodo: (id: string) => void;
  onRenameTodo: (id: string, title: string) => void;
  onToggleTodoDone: (id: string, isDone: boolean) => void;
  todos: Todo[];
  visibleTodos: Todo[];
};

export function TodoList({
  onDeleteTodo,
  onRenameTodo,
  onToggleTodoDone,
  todos,
  visibleTodos,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <VStack gap={1}>
        <Heading level={2}>No todos yet</Heading>
        <Text as="p" color="secondary">
          Add your first item above to start tracking work.
        </Text>
      </VStack>
    );
  }

  if (visibleTodos.length === 0) {
    return (
      <VStack gap={1}>
        <Heading level={2}>Nothing matches this filter</Heading>
        <Text as="p" color="secondary">
          Switch the filter or add a new todo.
        </Text>
      </VStack>
    );
  }

  return (
    <VStack gap={3} width="100%">
      {visibleTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          onDelete={onDeleteTodo}
          onRename={onRenameTodo}
          onToggleDone={onToggleTodoDone}
          todo={todo}
        />
      ))}
    </VStack>
  );
}
