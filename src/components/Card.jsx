import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

export default function Card({ card, index, columnId, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(card.title);

  const handleSave = () => {
    if (draft.trim()) onEdit(columnId, card.id, draft);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`card ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isEditing ? (
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => setIsEditing(true)}>{card.title}</span>
          )}

          <button
            className="card-delete"
            onClick={() => onDelete(columnId, card.id)}
          >
            ✕
          </button>
        </div>
      )}
    </Draggable>
  );
}
