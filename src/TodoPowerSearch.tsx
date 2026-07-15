import { useEffect, useMemo, useState } from "react";
import { PowerSearch, usePowerSearchConfig } from "@astryxdesign/core/PowerSearch";
import type {
  FieldDefinition,
  PowerSearchFilter,
} from "@astryxdesign/core/PowerSearch";
import { useTranslator } from "@astryxdesign/core/i18n";
import type { Todo } from "./todos";

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
  const t = useTranslator();

  // Field defs need to be inside the component (labels are translated).
  // `usePowerSearchConfig` re-derives config whenever the field array
  // identity changes, so memoize against the translator identity.
  const fields = useMemo(
    () =>
      [
        {
          key: "title",
          type: "string",
          label: t("@app.powersearch.title"),
        },
        {
          key: "status",
          type: "enum",
          label: t("@app.powersearch.status"),
          enumValues: [
            { value: "open", label: t("@app.powersearch.statusOpen") },
            { value: "closed", label: t("@app.powersearch.statusClosed") },
          ],
        },
        {
          key: "createdAt",
          type: "date",
          label: t("@app.powersearch.created"),
        },
      ] as const satisfies ReadonlyArray<FieldDefinition>,
    [t],
  );

  const { config, applyFilters } = usePowerSearchConfig(fields);
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
