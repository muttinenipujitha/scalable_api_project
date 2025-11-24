import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const { user, logoutUser } = useAuth();

  return (
    <div className="app-container">
      <header className="navbar">
        <div className="nav-left">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        </div>
        <div className="nav-right">
          {user ? (
            <>
              <span style={{ fontSize: "13px" }}>
                Logged in as <strong>{user.name}</strong> ({user.role})
              </span>
              <button className="btn btn-secondary" onClick={logoutUser}style={{color:'red'}}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<div>Welcome to the Tasks App 👋</div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
