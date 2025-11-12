import './TaskList.css';

const TaskList = ({
  items,
  isError,
  isLoading,
  onEdit,
  onSaveEdit,
  onDelete,
  editIndex,
  editedTodo,
  setEditedTodo,
  onComplete
}) => {
  // Loading state
  if (isLoading && (!items || items.length === 0)) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading your tasks...</div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="error-container">
        <div className="error-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
        </div>
        <div className="error-title">Something went wrong</div>
        <div className="error-message">
          We couldn't load your tasks. Please check your connection and try again.
        </div>
      </div>
    );
  }

  // Empty state
  if (!items || items.length === 0) {
    return (
      <div className="empty-container">
        <div className="empty-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 11l3 3L22 4"></path>
            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
          </svg>
        </div>
        <div className="empty-title">No tasks yet</div>
        <div className="empty-message">
          Start by adding your first task above. Break down your goals into manageable steps and track your progress.
        </div>
        <div className="empty-cta">
          Your productivity journey begins with a single task ✨
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      {/* Task List Header */}
      <div className="task-list-header">
        <h2 className="task-list-title">Your Tasks</h2>
      </div>

      {/* Task List */}
      <div className="task-list-wrapper">
        <div className="task-list-content">
          {items.map((item, index) => (
            <div
              key={item._id}
              className={`task-item ${item.complete ? 'task-completed' : ''}`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {item._id === editIndex ? (
                // Edit Mode
                <div className="edit-mode">
                  <div className="edit-form">
                    <div className="edit-input-container">
                      <textarea
                        className="edit-input focus-ring"
                        value={editedTodo}
                        maxLength={200}
                        rows={1}
                        onChange={(e) => {
                          setEditedTodo(e.target.value);
                          // Auto-resize textarea
                          e.target.style.height = 'auto';
                          e.target.style.height = e.target.scrollHeight + 'px';
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            onSaveEdit();
                          } else if (e.key === "Escape") {
                            onEdit(-1);
                          }
                        }}
                        placeholder="Update your task..."
                        autoFocus
                      />
                    </div>
                    <div className="edit-actions">
                      <button
                        className="btn btn-save focus-ring"
                        onClick={() => onSaveEdit()}
                        disabled={!editedTodo.trim()}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                        Save
                      </button>
                      <button
                        className="btn btn-cancel focus-ring"
                        onClick={() => onEdit(-1)}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Display Mode
                <div className="task-display">
                  <div 
                    className="task-checkbox"
                    onClick={() => !item.complete && onComplete(item._id)}
                    style={{ cursor: item.complete ? 'default' : 'pointer' }}
                  >
                    {item.complete ? (
                      <div className="checkbox-checked">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                      </div>
                    ) : (
                      <div className="checkbox-unchecked"></div>
                    )}
                  </div>
                  
                  <div className="task-content">
                    <div className={`task-text ${item.complete ? 'completed-text' : ''}`}>
                      {item.task}
                    </div>
                    <div className="task-meta">
                      <div className={`task-status ${item.complete ? 'status-completed' : 'status-pending'}`}>
                        {item.complete ? (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="20,6 9,17 4,12"></polyline>
                            </svg>
                            Completed
                          </>
                        ) : (
                          <>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12,6 12,12 16,14"></polyline>
                            </svg>
                            Pending
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="task-actions">
                    {item.complete ? (
                      <button
                        className="btn btn-completed"
                        disabled
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                        Done
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-complete focus-ring"
                          onClick={() => onComplete(item._id)}
                          title="Mark as complete"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20,6 9,17 4,12"></polyline>
                          </svg>
                          Complete
                        </button>
                        <button
                          className="btn btn-edit focus-ring"
                          onClick={() => onEdit(item._id, index)}
                          title="Edit task"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                          Edit
                        </button>
                      </>
                    )}
                    <button
                      className="btn btn-delete focus-ring"
                      onClick={() => onDelete(item._id)}
                      title="Delete task"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;