import React, { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "../api.js";
import TaskForm from "../components/TaskForm.jsx";
import TaskList from "../components/TaskList.jsx";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    const res = await fetchTasks();
    if (res.tasks) {
      setTasks(res.tasks);
    } else if (res.message) {
      setMessage(res.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreate = async (data) => {
    setMessage(null);
    const res = await createTask(data);
    if (res.task) {
      setTasks((prev) => [res.task, ...prev]);
      setMessage("Task created");
    } else if (res.errors) {
      setMessage(res.errors[0].msg);
    } else if (res.message) {
      setMessage(res.message);
    }
  };

  const handleUpdate = async (id, data) => {
    setMessage(null);
    const res = await updateTask(id, data);
    if (res.task) {
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.task : t))
      );
      setMessage("Task updated");
      setEditingTask(null);
    } else if (res.message) {
      setMessage(res.message);
    }
  };

  const handleDelete = async (id) => {
    setMessage(null);
    const res = await deleteTask(id);
    if (res.message === "Task deleted") {
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setMessage("Task deleted");
    } else if (res.message) {
      setMessage(res.message);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Task Dashboard</h2>
          <p className="dashboard-subtitle">
            Create, update and track your tasks. Access is protected by JWT.
          </p>
        </div>
      </div>

      {message && (
        <p className="auth-message success" style={{ marginBottom: 10 }}>
          {message}
        </p>
      )}

      <div className="section-card">
        <h3 style={{ marginBottom: 10, fontSize: 16 }}>Create a new task</h3>
        <TaskForm
          onSubmit={handleCreate}
          initialValues={{ title: "", description: "", status: "pending" }}
          submitLabel="Create Task"
        />
      </div>

      <div className="section-card">
        <h3 style={{ marginBottom: 10, fontSize: 16 }}>Your tasks</h3>
        <TaskList
          tasks={tasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDelete}
        />
      </div>

      {editingTask && (
        <div className="section-card">
          <h3 style={{ marginBottom: 10, fontSize: 16 }}>Edit task</h3>
          <TaskForm
            initialValues={editingTask}
            submitLabel="Update Task"
            onSubmit={(data) => handleUpdate(editingTask._id, data)}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
