import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const data = await loginUser(formData);

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login Successful!", {
        autoClose: 1500,
      });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    } catch (error) {
      console.error(error);

      setFormData((prev) => ({
        ...prev,
        password: "",
      }));

      toast.error(
        error.response?.data?.detail ||
          error.response?.data?.error ||
          "Invalid username or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Login to your JobConnect account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block font-medium mb-2">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-2">
              Password
            </label>

          <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Enter your password"
    value={formData.password}
    onChange={handleChange}
    className="w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
    autoComplete="current-password"
    required
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </button>
</div>
          </div>

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Remember Me
            </label>

          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;