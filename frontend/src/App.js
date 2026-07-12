import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

// Pages
import Dashboard from "./pages/Dashboard";
import JobDetail from "./pages/JobDetail";
import PostJob from "./pages/PostJob";
import Applicants from "./pages/Applicants";
import EditJob from "./pages/EditJob";
import SavedJobs from "./pages/SavedJobs";
import BlogDetail from "./pages/BlogDetail";

// Home
import Home from "./components/jobs/Home";

// Jobs
import JobList from "./components/jobs/JobList";

// Authentication
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ForgotPassword from "./components/auth/ForgotPassword";
import VerifyOTP from "./components/auth/VerifyOTP";
import ResetPassword from "./components/auth/ResetPassword";

// Other Components
import Companies from "./components/companies/Companies";
import Blog from "./components/blog/Blog";
import Pricing from "./components/pricing/Pricing";
import About from "./components/about/About";
import Profile from "./components/profile/Profile";
import MyApplications from "./components/applications/MyApplications";


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">

          <main>
            <Routes>

              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Jobs */}
              <Route path="/jobs" element={<JobList />} />
              <Route path="/jobs/:id" element={<JobDetail />} />

              {/* Employer */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/post-job" element={<PostJob />} />
              <Route path="/edit-job/:id" element={<EditJob />} />
              <Route path="/applicants/:jobId" element={<Applicants />} />

              {/* User */}
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/my-applications" element={<MyApplications />} />
              <Route path="/profile" element={<Profile />} />

              {/* Other */}
              <Route path="/companies" element={<Companies />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog/:id" element={<BlogDetail />} />

            </Routes>
          </main>

          <ToastContainer
            position="top-right"
            autoClose={3000}
          />

        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;