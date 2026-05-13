import { useState } from "react";

export default function AddCardForm({ columnId, onAdd, className = "" }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!text.trim()) return; // jangan tambah card kosong
    onAdd(columnId, text);
    setText(""); // reset input setelah submit
    setOpen(false); // tutup form
  };

  if (!open)
    return (
      <button
        className={`add-card-btn ${className}`}
        onClick={() => setOpen(true)}
      >
        + Add Task
      </button>
    );

  return (
    <div className="add-card-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
        placeholder="Judul card..."
        autoFocus
        className="input-area"
      />
      <div className="add-card-actions">
        <button onClick={handleSubmit} className="">
          Add Task
        </button>
        <button
          onClick={() => {
            setOpen(false);
            setText("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
