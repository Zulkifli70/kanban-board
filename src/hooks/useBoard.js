import { useState, useEffect } from "react";
import { saveToStorage, loadFromStorage } from "../utils/storage";

const initialColumns = [
  {
    id: "col-1",
    title: "To Do",
    cards: [{ id: "cards-1", title: "Contoh Task" }],
  },
  {
    id: "col-2",
    title: "In Progress",
    cards: [],
  },
  {
    id: "col-3",
    title: "Completed",
    cards: [],
  },
];

function mergeColumnsWithDefaults(savedColumns) {
  if (!Array.isArray(savedColumns)) {
    return initialColumns;
  }

  const savedColumnsById = new Map(
    savedColumns.map((column) => [column.id, column]),
  );

  const mergedColumns = initialColumns.map((defaultColumn) => {
    const savedColumn = savedColumnsById.get(defaultColumn.id);

    return {
      ...defaultColumn,
      ...savedColumn,
      // Title mengikuti config terbaru, cards tetap memakai data user.
      title: defaultColumn.title,
      cards: Array.isArray(savedColumn?.cards)
        ? savedColumn.cards
        : defaultColumn.cards,
    };
  });

  const customColumns = savedColumns.filter(
    (column) =>
      !initialColumns.some((defaultColumn) => defaultColumn.id === column.id),
  );

  return [...mergedColumns, ...customColumns];
}

export function useBoard() {
  const [columns, setColumns] = useState(() => {
    const saved = loadFromStorage();
    return mergeColumnsWithDefaults(saved);
  });

  useEffect(() => {
    saveToStorage(columns);
  }, [columns]);

  const addCard = (columnId, title) => {
    const newCard = {
      id: `card-${Date.now()}`,
      title: title.trim(),
    };
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col,
      ),
    );
  };

  const deleteCard = (columnId, cardId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? { ...col, cards: col.cards.filter((c) => c.id !== cardId) }
          : col,
      ),
    );
  };

  const editCard = (columnId, cardId, changes) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              cards: col.cards.map((card) =>
                card.id === cardId ? { ...card, ...changes } : card,
              ),
            }
          : col,
      ),
    );
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // 1. Dibatalkan (dilepas di luar kolom) → tidak lakukan apapun
    if (!destination) return;

    // 2. Dilepas di posisi yang sama persis → tidak lakukan apapun
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    setColumns((prev) => {
      const cols = prev.map((c) => ({ ...c, cards: [...c.cards] }));

      const srcCol = cols.find((c) => c.id === source.droppableId);
      const destCol = cols.find((c) => c.id === destination.droppableId);

      // 3. Ambil card dari kolom asal
      const [movedCard] = srcCol.cards.splice(source.index, 1);

      // 4. Sisipkan ke kolom tujuan di posisi yang tepat
      destCol.cards.splice(destination.index, 0, movedCard);

      return cols;
    });
  };

  return { columns, addCard, deleteCard, editCard, onDragEnd };
}
