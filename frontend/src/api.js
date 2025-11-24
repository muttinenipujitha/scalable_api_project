const API_BASE_URL = "http://localhost:5000/api/v1";

export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`
  };
};

export const register = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
};

export const login = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
};

export const fetchTasks = async () => {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    }
  });
  return res.json();
};

export const createTask = async (payload) => {
  const res = await fetch(`${API_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};

export const updateTask = async (id, payload) => {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    },
    body: JSON.stringify(payload)
  });
  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders()
    }
  });
  return res.json();
};
