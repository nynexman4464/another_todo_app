import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";
import { Selector } from "@astryxdesign/core/Selector";
import { StackItem } from "@astryxdesign/core/Stack";
import { TextInput } from "@astryxdesign/core/TextInput";
import { ToggleButton, ToggleButtonGroup } from "@astryxdesign/core/ToggleButton";
import { useTranslator } from "@astryxdesign/core/i18n";
import {
  getTodoTitleValidationMessage,
  type TodoFilterMode,
  type TodoSortMode,
} from "./todos";

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
  const t = useTranslator();
  const [draftTitle, setDraftTitle] = useState("");
  const [draftError, setDraftError] = useState<string | null>(null);
  const createInputRef = useRef<HTMLInputElement>(null);

  const filterOptions: Array<{ value: TodoFilterMode; label: string }> = [
    { value: "all", label: t("@app.controls.filter.all") },
    { value: "open", label: t("@app.controls.filter.open") },
    { value: "closed", label: t("@app.controls.filter.closed") },
  ];

  const sortOptions: Array<{ value: TodoSortMode; label: string }> = [
    { value: "newest", label: t("@app.controls.sort.newest") },
    { value: "oldest", label: t("@app.controls.sort.oldest") },
    { value: "updated", label: t("@app.controls.sort.updated") },
  ];

  function handleAddTodo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationMessage = getTodoTitleValidationMessage(draftTitle, t);

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
                label={t("@app.controls.newTodoLabel")}
                onChange={(value) => {
                  setDraftTitle(value);
                  if (draftError) {
                    setDraftError(null);
                  }
                }}
                placeholder={t("@app.controls.newTodoPlaceholder")}
                ref={createInputRef}
                status={draftError ? { type: "error", message: draftError } : undefined}
                value={draftTitle}
              />
            </StackItem>
            <Button label={t("@app.controls.addTodo")} type="submit" variant="primary" />
          </HStack>
        </form>
      </StackItem>

      <HStack gap={2} vAlign="end" wrap="wrap">
        <ToggleButtonGroup
          label={t("@app.controls.filterLabel")}
          onChange={(value) => {
            if (typeof value === "string") {
              onFilterChange(value as TodoFilterMode);
            }
          }}
          type="single"
          value={filterMode}
        >
          {filterOptions.map((filterOption) => (
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
          label={t("@app.controls.sortLabel")}
          onChange={(value) => onSortChange(value as TodoSortMode)}
          options={sortOptions}
          value={sortMode}
        />
      </HStack>
    </HStack>
  );
}
