import { useEffect, useState } from "react";
import { PowerSearch, usePowerSearchConfig } from "@astryxdesign/core/PowerSearch";
import type {
  FieldDefinition,
  PowerSearchFilter,
} from "@astryxdesign/core/PowerSearch";
import type { Todo } from "./todos";

// Field definitions describe what can be filtered on. PowerSearch derives
// operator lists per field type (string -> contains/is/starts with/…, enum ->
// is any of / is not, etc.).
const TODO_FIELDS = [
  {
    key: "title",
    type: "string",
    label: "Title",
  },
  {
    key: "status",
    type: "enum",
    label: "Status",
    enumValues: [
      { value: "open", label: "Open" },
      { value: "closed", label: "Closed" },
    ],
  },
  {
    key: "createdAt",
    type: "date",
    label: "Created",
  },
] as const satisfies ReadonlyArray<FieldDefinition>;

// Search-record shape: what applyFilters actually operates on.
type TodoSearchRecord = {
  id: string;
  title: string;
  status: "open" | "closed";
  createdAt: Date;
};

function toSearchRecord(todo: Todo): TodoSearchRecord {
  return {
    id: todo.id,
    title: todo.title,
    status: todo.isDone ? "closed" : "open",
    createdAt: new Date(todo.createdAt),
  };
}

type TodoPowerSearchProps = {
  todos: ReadonlyArray<Todo>;
  onResultsChange: (matchingIds: ReadonlySet<string>) => void;
};

export function TodoPowerSearch({
  todos,
  onResultsChange,
}: TodoPowerSearchProps) {
  const { config, applyFilters } = usePowerSearchConfig(TODO_FIELDS);
  const [filters, setFilters] = useState<ReadonlyArray<PowerSearchFilter>>([]);

  useEffect(() => {
    if (filters.length === 0) {
      onResultsChange(new Set(todos.map((todo) => todo.id)));
      return;
    }

    const searchRecords = todos.map(toSearchRecord);
    const matched = applyFilters(filters, searchRecords);
    onResultsChange(new Set(matched.map((record) => record.id)));
  }, [filters, todos, applyFilters, onResultsChange]);

  return (
    <PowerSearch
      config={config}
      filters={filters}
      onChange={(nextFilters) => setFilters(nextFilters)}
    />
  );
}
