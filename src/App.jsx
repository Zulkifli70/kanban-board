import { DragDropContext } from "@hello-pangea/dnd";
import { useBoard } from "./hooks/useBoard";
import Board from "./components/Board";

export default function App() {
  const { columns, addCard, deleteCard, editCard, onDragEnd } = useBoard();

  return (
    <div className="app">
      <h1 className="app-title">Kanban Board</h1>

      {/* DragDropContext harus membungkus semua area drag & drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Board
          columns={columns}
          onAddCard={addCard}
          onDeleteCard={deleteCard}
          onEditCard={editCard}
        />
      </DragDropContext>
    </div>
  );
}
