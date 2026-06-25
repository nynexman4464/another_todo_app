import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";
import { Selector } from "@astryxdesign/core/Selector";
import { StackItem } from "@astryxdesign/core/Stack";
import { TextInput } from "@astryxdesign/core/TextInput";
import { ToggleButton, ToggleButtonGroup } from "@astryxdesign/core/ToggleButton";
import {
  getTodoTitleValidationMessage,
  type TodoFilterMode,
  type TodoSortMode,
} from "./todos";

const FILTER_OPTIONS: Array<{ value: TodoFilterMode; label: string }> = [
  { value: "all", label: "All" },
  { value: "open", label: "Open" },
  { value: "closed", label: "Closed" },
];

const SORT_OPTIONS: Array<{ value: TodoSortMode; label: string }> = [
  { value: "newest", label: "Newest created" },
  { value: "oldest", label: "Oldest created" },
  { value: "updated", label: "Recently updated" },
];

type TodoControlsProps = {
  filterMode: TodoFilterMode;
  onAddTodo: (title: string) => void;
  onFilterChange: (filterMode: TodoFilterMode) => void;
  onSortChange: (sortMode: TodoSortMode) => void;
  sortMode: TodoSortMode;
};

export function TodoControls({
  filterMode,
  onAddTodo,
  onFilterChange,
  onSortChange,
  sortMode,
}: TodoControlsProps) {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftError, setDraftError] = useState<string | null>(null);
  const createInputRef = useRef<HTMLInputElement>(null);

  function handleAddTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationMessage = getTodoTitleValidationMessage(draftTitle);

    if (validationMessage) {
      setDraftError(validationMessage);
      return;
    }

    onAddTodo(draftTitle.trim());
    setDraftTitle("");
    setDraftError(null);
    createInputRef.current?.focus();
  }

  return (
    <HStack gap={3} vAlign="start" wrap="wrap" width="100%">
      <StackItem size="fill">
        <form onSubmit={handleAddTodo}>
          <HStack gap={2} vAlign="end" wrap="wrap" width="100%">
            <StackItem size="fill">
              <TextInput
                hasClear
                isLabelHidden
                label="New todo"
                onChange={(value) => {
                  setDraftTitle(value);
                  if (draftError) {
                    setDraftError(null);
                  }
                }}
                placeholder="Add a new todo"
                ref={createInputRef}
                status={draftError ? { type: "error", message: draftError } : undefined}
                value={draftTitle}
              />
            </StackItem>
            <Button label="Add todo" type="submit" variant="primary" />
          </HStack>
        </form>
      </StackItem>

      <HStack gap={2} vAlign="end" wrap="wrap">
        <ToggleButtonGroup
          label="Filter todos"
          onChange={(value) => {
            if (typeof value === "string") {
              onFilterChange(value as TodoFilterMode);
            }
          }}
          type="single"
          value={filterMode}
        >
          {FILTER_OPTIONS.map((filterOption) => (
            <ToggleButton
              key={filterOption.value}
              label={filterOption.label}
              value={filterOption.value}
            >
              {filterOption.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Selector
          isLabelHidden
          label="Sort todos"
          onChange={(value) => onSortChange(value as TodoSortMode)}
          options={SORT_OPTIONS}
          value={sortMode}
        />
      </HStack>
    </HStack>
  );
}
