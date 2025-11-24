import React, { useState, useEffect } from "react";

const TaskForm = ({ initialValues, onSubmit, submitLabel }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  useEffect(() => {
    setForm({
      title: initialValues.title || "",
      description: initialValues.description || "",
      status: initialValues.status || "pending"
    });
  }, [initialValues]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="input"
        name="title"
        placeholder="Task title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        className="input"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <select
        className="select"
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;
