import { useRef, useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

function formatDeadlineDate(deadline) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(deadline));
}

function getDeadlineBadge(deadline) {
  if (!deadline) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(deadline);
  due.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: "Overdue", style: "deadline-overdue" };
  if (diffDays === 0) return { label: "Today", style: "deadline-today" };
  if (diffDays <= 7) return { label: `${diffDays}d`, style: "deadline-soon" };

  return { label: formatDeadlineDate(deadline), style: "deadline-far" };
}

export default function Card({
  card,
  index,
  columnId,
  isCompletedColumn = false,
  onDelete,
  onEdit,
  className = "",
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(card.title);
  const deadlineInputRef = useRef(null);

  const handleSaveTitle = () => {
    if (draft.trim()) onEdit(columnId, card.id, { title: draft.trim() });
    setIsEditing(false);
  };

  const handleDeadlineChange = (e) => {
    onEdit(columnId, card.id, { deadline: e.target.value || null });
  };

  const handleOpenDeadlinePicker = () => {
    const input = deadlineInputRef.current;
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.click();
  };

  const deadlineBadge = getDeadlineBadge(card.deadline);

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`card ${snapshot.isDragging ? "dragging" : ""} ${className}`.trim()}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="card-header">
            <div className="card-top" {...provided.dragHandleProps}>
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
          {!isCompletedColumn && (
            <div className="card-deadline">
              <button
                type="button"
                className={`deadline-badge deadline-picker ${deadlineBadge?.style ?? "deadline-empty"}`}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={handleOpenDeadlinePicker}
              >
                <span>{deadlineBadge?.label ?? "Set deadline"}</span>
              </button>
              <input
                ref={deadlineInputRef}
                type="date"
                value={card.deadline ?? ""}
                onChange={handleDeadlineChange}
                className="deadline-input"
                tabIndex={-1}
                aria-label={`Set deadline for ${card.title}`}
              />
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
