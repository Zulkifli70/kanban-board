const KEY = "kanban-data";

export function saveToStorage(columns) {
  localStorage.setItem(KEY, JSON.stringify(columns));
}

export function loadFromStorage() {
  const raw = localStorage.getItem(KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
