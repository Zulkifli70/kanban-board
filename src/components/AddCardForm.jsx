import { useState } from "react";

export default function AddCardForm({ columnId, onAdd }) {
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
      <button className="add-card-btn" onClick={() => setOpen(true)}>
        + Add a card
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
      />
      <div className="add-card-actions">
        <button onClick={handleSubmit}>Add Card</button>
        <button
          onClick={() => {
            setOpen(false);
            setText("");
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
