import { useState } from "react";
import type { KeyboardEvent, SVGProps } from "react";
import { useImperativeAlertDialog } from "@astryxdesign/core/AlertDialog";
import { Button } from "@astryxdesign/core/Button";
import { Card } from "@astryxdesign/core/Card";
import { CheckboxInput } from "@astryxdesign/core/CheckboxInput";
import { HStack } from "@astryxdesign/core/HStack";
import { Icon } from "@astryxdesign/core/Icon";
import { IconButton } from "@astryxdesign/core/IconButton";
import { StackItem } from "@astryxdesign/core/Stack";
import { Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Timestamp } from "@astryxdesign/core/Timestamp";
import { getTodoTitleValidationMessage, type Todo } from "./todos";

function PencilIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M13.6 3.4 16.6 6.4 7.2 15.8 3.8 16.2 4.2 12.8 13.6 3.4Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M12.2 4.8 15.2 7.8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M3.8 5.4H16.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <path
        d="M7.2 5.4V3.8H12.8V5.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M5.6 7.4L6.3 16.2H13.7L14.4 7.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M8.4 9.2V14.2M11.6 9.2V14.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

type TodoItemProps = {
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onToggleDone: (id: string, isDone: boolean) => void;
  todo: Todo;
};

export function TodoItem({ onDelete, onRename, onToggleDone, todo }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingError, setEditingError] = useState<string | null>(null);
  const deleteDialog = useImperativeAlertDialog();

  function resetEditingState() {
    setIsEditing(false);
    setEditingTitle("");
    setEditingError(null);
  }

  function startEditing() {
    setIsEditing(true);
    setEditingTitle(todo.title);
    setEditingError(null);
  }

  function saveEditingTodo() {
    const validationMessage = getTodoTitleValidationMessage(editingTitle);

    if (validationMessage) {
      setEditingError(validationMessage);
      return;
    }

    const normalizedTitle = editingTitle.trim();

    if (todo.title !== normalizedTitle) {
      onRename(todo.id, normalizedTitle);
    }

    resetEditingState();
  }

  function handleEditKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      resetEditingState();
    }
  }

  function requestDelete() {
    deleteDialog.show({
      actionLabel: "Delete todo",
      description: `Delete "${todo.title}"? This cannot be undone.`,
      onAction: () => {
        onDelete(todo.id);
        resetEditingState();
        deleteDialog.hide();
      },
      title: "Delete todo",
    });
  }

  return (
    <Card className="todo-card" padding={3}>
      <CheckboxInput
        className="todo-card-checkbox"
        isLabelHidden
        label={`Mark ${todo.title} complete`}
        onChange={(isDone) => onToggleDone(todo.id, isDone)}
        size="sm"
        value={todo.isDone}
      />

      {isEditing ? (
        <form
          className="todo-card-edit"
          onBlur={(event) => {
            const nextTarget = event.relatedTarget;
            if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) {
              return;
            }

            resetEditingState();
          }}
          onKeyDown={handleEditKeyDown}
          onSubmit={(event) => {
            event.preventDefault();
            saveEditingTodo();
          }}
        >
          <HStack gap={2} vAlign="end" wrap="wrap" width="100%">
            <StackItem size="fill">
              <TextInput
                hasAutoFocus
                isLabelHidden
                label={`Edit ${todo.title}`}
                onChange={(value) => {
                  setEditingTitle(value);
                  if (editingError) {
                    setEditingError(null);
                  }
                }}
                status={editingError ? { type: "error", message: editingError } : undefined}
                value={editingTitle}
              />
            </StackItem>
            <Button label="Save" type="submit" variant="primary" />
            <Button label="Cancel" onClick={resetEditingState} variant="ghost" />
          </HStack>
        </form>
      ) : (
        <>
          <Text
            as="div"
            className="todo-card-title"
            color={todo.isDone ? "secondary" : "primary"}
            hasStrikethrough={todo.isDone}
            onClick={startEditing}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                startEditing();
              }
            }}
            maxLines={2}
            role="button"
            tabIndex={0}
            textWrap="wrap"
            type="large"
            weight="semibold"
            wordBreak="break-word"
          >
            {todo.title}
          </Text>

          <HStack className="todo-card-actions" gap={1} vAlign="center" wrap="wrap">
            <IconButton
              icon={<Icon icon={PencilIcon} />}
              label={`Edit ${todo.title}`}
              onClick={startEditing}
              size="sm"
              tooltip="Edit"
              variant="ghost"
            />
            <IconButton
              icon={<Icon icon={TrashIcon} />}
              label={`Delete ${todo.title}`}
              onClick={requestDelete}
              size="sm"
              tooltip="Delete"
              variant="destructive"
            />
          </HStack>
        </>
      )}

      <HStack className="todo-card-metadata" gap={3} wrap="wrap" width="100%">
        <HStack gap={1} wrap="wrap">
          <Text type="supporting">Created</Text>
          <Timestamp hasTooltip isLive value={todo.createdAt} />
        </HStack>
        <HStack gap={1} wrap="wrap">
          <Text type="supporting">Updated</Text>
          <Timestamp hasTooltip isLive value={todo.updatedAt} />
        </HStack>
      </HStack>

      {deleteDialog.element}
    </Card>
  );
}
