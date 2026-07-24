import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/VStack";
import { useTranslator } from "@astryxdesign/core/i18n";
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
  const t = useTranslator();

  if (todos.length === 0) {
    return (
      <VStack gap={1}>
        <Heading level={2}>{t("@app.list.emptyHeading")}</Heading>
        <Text as="p" color="secondary">
          {t("@app.list.emptyBody")}
        </Text>
      </VStack>
    );
  }

  if (visibleTodos.length === 0) {
    return (
      <VStack gap={1}>
        <Heading level={2}>{t("@app.list.noMatchHeading")}</Heading>
        <Text as="p" color="secondary">
          {t("@app.list.noMatchBody")}
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
