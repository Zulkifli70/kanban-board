import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

function getDeadlineStatus(deadline) {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline);
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "Overdue", style: "deadline-overdue" };
  if (diffDays === 0) return { label: "Due today", style: "deadline-today" };
  if (diffDays <= 2)
    return { label: `${diffDays}d left`, style: "deadline-soon" };
  return { label: `${diffDays}d left`, style: "deadline-ok" };
}

export default function Card({
  card,
  index,
  columnId,
  onDelete,
  onEdit,
  className = "",
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(card.title);

  const handleSaveTitle = () => {
    if (draft.trim()) onEdit(columnId, card.id, { title: draft.trim() });
    setIsEditing(false);
  };

  const handleDeadlineChange = (e) => {
    onEdit(columnId, card.id, { deadline: e.target.value || null });
  };

  const deadlineStatus = getDeadlineStatus(card.deadline);

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`card ${snapshot.isDragging ? "dragging" : ""} ${className}`.trim()}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="flex">
            <div className="card-top">
              {isEditing ? (
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onBlur={handleSaveTitle}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()}
                  autoFocus
                />
              ) : (
                <span onDoubleClick={() => setIsEditing(true)}>
                  {card.title}
                </span>
              )}
            </div>
            <div className="flex align-middle">
              {" "}
              <button
                className="card-delete"
                onClick={() => onDelete(columnId, card.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="card-deadline">
            <input
              type="date"
              value={card.deadline ?? ""}
              onChange={handleDeadlineChange}
              className="deadline-input"
            />
            {deadlineStatus && (
              <span className={`deadline-badge ${deadlineStatus.style}`}>
                {deadlineStatus.label}
              </span>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
