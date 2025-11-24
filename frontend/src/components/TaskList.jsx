import React from "react";

const getStatusClass = (status) => {
  if (status === "done") return "badge badge-done";
  if (status === "in-progress") return "badge badge-in-progress";
  return "badge badge-pending";
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length) {
    return <p className="task-empty">No tasks yet. Create your first task above.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="task-card" key={task._id}>
          <div className="task-header">
            <span className="task-title">{task.title}</span>
            <span className={getStatusClass(task.status)}>
              {task.status}
            </span>
          </div>
          {task.description && (
            <p className="task-desc">{task.description}</p>
          )}
          <div className="task-actions">
            <button
              className="btn btn-secondary"
              onClick={() => onEdit(task)}
            >
              Edit
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
