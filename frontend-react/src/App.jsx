import React, { useEffect, useState } from "react";
import "./App.css";
import TaskList from "./components/TaskList";
import { useDispatch, useSelector } from "react-redux";
import {
  completeTodo,
  createTodo,
  deleteTodo,
  editTodo,       // ✅ this exists
  fetchTodos,     // ✅ this exists
} from "./redux/taskSlice";  // ❌ no editTask import here

const App = () => {
  const dispatch = useDispatch();
  const { task, isLoading, isError } = useSelector((state) => state.todo);

  const [todo, setTodo] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [editedTodo, setEditedTodo] = useState("");

  const addItem = () => {
    if (todo.trim() !== "") {
      dispatch(createTodo(todo.trim()))
        .then(() => {
          setTodo("");
          dispatch(fetchTodos());
        })
        .catch((error) => console.error("Error creating todo:", error));
    }
  };

  const handleEdit = (id, index) => {
    setEditIndex(id);
    if (index > -1) {
      setEditedTodo(task[index].task);
    }
  };

  const handleSaveEdit = () => {
    if (editedTodo.trim() !== "") {
      dispatch(editTodo({ id: editIndex, task: editedTodo.trim() }))
        .then(() => {
          setEditIndex(-1);
          setEditedTodo("");
          dispatch(fetchTodos());
        })
        .catch((error) => console.error("Error editing todo:", error));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
      .then(() => {
        setEditIndex(-1);
        setEditedTodo("");
        dispatch(fetchTodos());
      })
      .catch((error) => console.error("Error deleting todo:", error));
  };

  const handleComplete = (id) => {
    dispatch(completeTodo(id))
      .then(() => {
        setEditIndex(-1);
        setEditedTodo("");
        dispatch(fetchTodos());
      })
      .catch((error) => console.error("Error completing todo:", error));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const totalTasks = Array.isArray(task) ? task.length : 0;
  const completedTasks = Array.isArray(task)
    ? task.filter((item) => item.complete).length
    : 0;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  if (isError) {
    return <h1 className="text-red-500 text-center">Error loading tasks</h1>;
  }

  return (
    <div className="app-container">
      <div className="main-content">
        <header className="app-header">
          <div className="app-logo">📋</div>
          <h1 className="app-title"> ved TaskFlow Pro</h1>
        </header>

        <section className="input-section">
          <div className="input-card">
            <div className="input-form">
              <textarea
                className="todo-input focus-ring"
                value={todo}
                maxLength={200}
                rows={1}
                onChange={(e) => {
                  setTodo(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = e.target.scrollHeight + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addItem();
                  }
                }}
                placeholder="What would you like to accomplish today?"
              />
              <button
                className="add-button focus-ring"
                onClick={addItem}
                disabled={!todo.trim() || isLoading}
              >
                {isLoading ? "Adding..." : "Add Task"}
              </button>
            </div>
          </div>
        </section>

        {totalTasks > 0 && (
          <section className="stats-section">
            <div className="stats-card">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="stat-number">{totalTasks}</div>
                  <div className="stat-label">Total</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{pendingTasks}</div>
                  <div className="stat-label">Pending</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{completedTasks}</div>
                  <div className="stat-label">Completed</div>
                </div>
              </div>
              <div className="progress-section">
                <div className="progress-label">
                  <span>Overall Progress</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="task-list-section">
          <TaskList
            items={Array.isArray(task) ? task : []}
            isError={isError}
            isLoading={isLoading}
            onEdit={handleEdit}
            onSaveEdit={handleSaveEdit}
            onDelete={handleDelete}
            editIndex={editIndex}
            editedTodo={editedTodo}
            setEditedTodo={setEditedTodo}
            onComplete={handleComplete}
          />
        </section>
      </div>
    </div>
  );
};

export default App;
