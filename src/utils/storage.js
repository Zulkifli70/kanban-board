const KEY = "kanban-data";

export function saveToStorage(columns) {
  localStorage.setItem(KEY, JSON.stringify(columns));
}

export function loadFromStorage() {
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}
