// ==============================
// 📁 File: frontend-react/src/services/api.js
// ==============================

// ✅ For development (Frontend on 5173, Backend on 5000)
const dev = window.location.port === "5173";

// ✅ Automatically choose API base URL
const API_BASE = dev ? "http://localhost:5000/todo" : "/api/todo";

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
    body: JSON.stringify({ title }),
  });
  if (!response.ok) throw new Error("Failed to add todo");
  return response.json();
}

// ==============================
// DELETE a todo
// ==============================
export async function deleteTodo(id) {
  const response = await fetch(`${API_BASE}/delete/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
  return response.json();
}
