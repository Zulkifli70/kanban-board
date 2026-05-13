import Column from "./Column";

export default function Board({
  columns,
  onAddCard,
  onDeleteCard,
  onEditCard,
}) {
  return (
    <div className="board">
      {columns.map((col) => (
        <Column
          key={col.id}
          column={col}
          onAddCard={onAddCard}
          onDeleteCard={onDeleteCard}
          onEditCard={onEditCard}
        />
      ))}
    </div>
  );
}
