import React, { useState } from "react";
import { register } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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
    const res = await register(form);

    if (res.errors) {
      setIsError(true);
      setMessage(res.errors[0].msg);
    } else if (res.token) {
      setIsError(false);
      loginUser(res.user, res.token);
      setMessage("Registered successfully");
      navigate("/dashboard");
    } else if (res.message) {
      setIsError(true);
      setMessage(res.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2 className="auth-title">Create an account</h2>
        <p className="auth-subtitle">
          Sign up to start managing your tasks securely.
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
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
            placeholder="Password (min 6 characters)"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="btn btn-primary mt-2">
            Create account
          </button>
        </form>

        <div className="form-footer">
          Already have an account?{" "}
          <span style={{ color: "#4f46e5", fontWeight: 500 }}>
            Login instead
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

