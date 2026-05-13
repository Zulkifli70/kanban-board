import { Droppable } from "@hello-pangea/dnd";
import Card from "./Card";
import AddCardForm from "./AddCardForm";

export default function Column({
  column,
  onAddCard,
  onDeleteCard,
  onEditCard,
}) {
  const columnVariantById = {
    "col-1": "todo",
    "col-2": "in-progress",
    "col-3": "completed",
  };

  const columnVariant = columnVariantById[column.id] ?? "default";

  return (
    <div className={`column column-${columnVariant}`}>
      {/* Header kolom: judul + jumlah card */}
      <div className="column-header">
        <h2 className="column-title">{column.title}</h2>
        <span className="column-count">{column.cards.length}</span>
      </div>

      {/* Droppable = area yang bisa menerima card yang di-drag */}
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`column-body ${snapshot.isDraggingOver ? "dragging-over" : ""}`}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {column.cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                columnId={column.id}
                onDelete={onDeleteCard}
                onEdit={onEditCard}
                className={`card-${columnVariant}`}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <AddCardForm columnId={column.id} onAdd={onAddCard} />
    </div>
  );
}
