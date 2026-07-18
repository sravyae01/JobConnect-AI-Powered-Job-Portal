import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";

// Common
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

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

// Other Components
import Companies from "./components/companies/Companies";
import Blog from "./components/blog/Blog";
import Pricing from "./components/pricing/Pricing";
import About from "./components/about/About";
import Profile from "./components/profile/Profile";
import MyApplications from "./components/applications/MyApplications";

function Layout() {
  const location = useLocation();

  const hideLayout = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify-otp",
    "/reset-password",
  ].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <main className="flex-1">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

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

      {!hideLayout && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <JobProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Layout />
          </div>
        </JobProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;