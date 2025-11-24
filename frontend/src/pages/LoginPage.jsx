import React, { useState } from "react";
import { login } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const res = await login(form);
    if (res.errors) {
      setIsError(true);
      setMessage(res.errors[0].msg);
    } else if (res.token) {
      setIsError(false);
      loginUser(res.user, res.token);
      setMessage("Login successful");
      navigate("/dashboard");
    } else if (res.message) {
      setIsError(true);
      setMessage(res.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Welcome back</h2>
        <p className="auth-subtitle">
          Login to access your dashboard and tasks.
        </p>

        {message && (
          <p
            className={`auth-message ${isError ? "error" : "success"}`}
          >
            {message}
          </p>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary mt-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
