import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

// Common
import Navbar from "./components/common/Navbar";

// Home
import Home from "./components/jobs/Home";

// Authentication
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Dashboards
import SeekerDashboard from "./components/dashboard/SeekerDashboard";
import EmployerDashboard from "./components/dashboard/EmployerDashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <main>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Jobs (Temporary) */}
              <Route path="/jobs" element={<Home />} />

              {/* Dashboards */}
              <Route
                path="/dashboard"
                element={<SeekerDashboard />}
              />

              <Route
                path="/employer-dashboard"
                element={<EmployerDashboard />}
              />
            </Routes>
          </main>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;