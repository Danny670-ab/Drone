// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Pages/Login"
import Signup from "./Components/Pages/Signup";
import Dashboard from "./Components/Pages/Dashboard";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export default function App() {
  // ✅ Create state for authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Dashboard (Protected Route) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />

    </Router>
  );
}
