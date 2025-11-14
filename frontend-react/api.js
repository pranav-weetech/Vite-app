// ==============================
// 📁 File: frontend-react/src/services/api.js
// ==============================

// Detect dev mode (Vite dev server runs on 5173)
const dev = window.location.port === "5173";

// Correct API base:
// - Dev:   http://localhost:5000/api/todo  (talks directly to backend while developing)
// - Prod:  /api/todo                        (Nginx reverse proxy exposes backend under /api)
const API_BASE = dev
  ? "http://localhost:5000/api/todo"
  : "/api/todo";

// ==============================
// GET all todos
// ==============================
export async function fetchTodos() {
  const response = await fetch(`${API_BASE}/getall`);
  if (!response.ok) throw new Error("Failed to fetch todos");
  return response.json();
}

// ==============================
// ADD a new todo
// ==============================
export async function addTodo(title) {
  const response = await fetch(`${API_BASE}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: title }), // backend expects { task }
  });
  if (!response.ok) throw new Error("Failed to add todo");
  return response.json();
}

// ==============================
// DELETE a todo
// ==============================
export async function deleteTodo(id) {
  // Your backend expects id in request body for delete in controllers; your earlier code used body for delete.
  // If your backend expects DELETE with body: { id }, use this:
  const response = await fetch(`${API_BASE}/delete`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error("Failed to delete todo");
  return response.json();
}

// ==============================
// COMPLETE a todo
// ==============================
export async function completeTodo(id) {
  const response = await fetch(`${API_BASE}/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error("Failed to complete todo");
  return response.json();
}

// ==============================
// EDIT a todo
// ==============================
export async function editTodo(id, task) {
  const response = await fetch(`${API_BASE}/edit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, task }),
  });
  if (!response.ok) throw new Error("Failed to edit todo");
  return response.json();
}
