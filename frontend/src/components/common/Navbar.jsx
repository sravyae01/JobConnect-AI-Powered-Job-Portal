import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  const navLinks = [
    { name: "Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex justify-between items-center">

          {/* Logo */}

          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
              J
            </div>

            <h1 className="font-bold text-3xl text-gray-900">
              JobConnect
            </h1>
          </Link>

          {/* Desktop Menu */}

          <div className="hidden lg:flex items-center gap-10">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-blue-600"
                  : "font-medium text-gray-700 hover:text-blue-600"
              }
            >
              Home
            </NavLink>

            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-medium text-blue-600"
                    : "font-medium text-gray-700 hover:text-blue-600"
                }
              >
                {item.name}
              </NavLink>
            ))}
            {user?.role === "employer" && (
  <NavLink
    to="/dashboard"
    className={({ isActive }) =>
      isActive
        ? "font-medium text-blue-600"
        : "font-medium text-gray-700 hover:text-blue-600"
    }
  >
    Dashboard
  </NavLink>
)}

          </div>

          {/* Right Side */}

          <div className="hidden lg:flex items-center gap-5">

            {user ? (

              <div className="relative">

                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600"
                >
                  👤 {user.username}
                  <ChevronDown size={18} />
                </button>

                {profileOpen && (

                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border overflow-hidden">

                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="block px-5 py-3 hover:bg-gray-100"
                    >
                      👤 My Profile
                    </Link>

                   {user?.role === "seeker" ? (
  <>
    <Link
      to="/my-applications"
      onClick={() => setProfileOpen(false)}
      className="block px-5 py-3 hover:bg-gray-100"
    >
      📄 My Applications
    </Link>

    <Link
      to="/saved-jobs"
      onClick={() => setProfileOpen(false)}
      className="block px-5 py-3 hover:bg-gray-100"
    >
      ❤️ Saved Jobs
    </Link>
  </>
) : (
  <>
    <Link
      to="/dashboard"
      onClick={() => setProfileOpen(false)}
      className="block px-5 py-3 hover:bg-gray-100"
    >
      📊 Dashboard
    </Link>

    <Link
      to="/post-job"
      onClick={() => setProfileOpen(false)}
      className="block px-5 py-3 hover:bg-gray-100"
    >
      ➕ Post Job
    </Link>
  </>
)}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-5 py-3 hover:bg-red-50 text-red-600"
                    >
                      🚪 Logout
                    </button>

                  </div>

                )}

              </div>

            ) : (

              <>
                <Link
                  to="/login"
                  className="font-medium text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                >
                  Sign Up
                </Link>
              </>

            )}

          </div>

          {/* Mobile Menu Button */}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Menu */}

        {mobileOpen && (

          <div className="lg:hidden border-t border-gray-100 bg-white">

            <div className="flex flex-col py-5">

              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                Home
              </NavLink>

              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="px-6 py-3 font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="px-6 mt-5 flex flex-col gap-3">

                {user ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="text-center font-semibold text-gray-700"
                    >
                      👤 My Profile
                    </Link>
                    {user?.role === "seeker" ? (
  <>
    <Link
      to="/my-applications"
      onClick={() => setMobileOpen(false)}
      className="text-center font-semibold text-gray-700"
    >
      📄 My Applications
    </Link>

    <Link
      to="/saved-jobs"
      onClick={() => setMobileOpen(false)}
      className="text-center font-semibold text-gray-700"
    >
      ❤️ Saved Jobs
    </Link>
  </>
) : (
  <>
    <Link
      to="/dashboard"
      onClick={() => setMobileOpen(false)}
      className="text-center font-semibold text-gray-700"
    >
      📊 Dashboard
    </Link>

    <Link
      to="/post-job"
      onClick={() => setMobileOpen(false)}
      className="text-center font-semibold text-gray-700"
    >
      ➕ Post Job
    </Link>
  </>
)}

                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="border border-blue-600 text-blue-600 py-3 rounded-xl text-center font-semibold hover:bg-blue-50 transition"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="bg-blue-600 text-white py-3 rounded-xl text-center font-semibold hover:bg-blue-700 transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </nav>
  );
};

export default Navbar;