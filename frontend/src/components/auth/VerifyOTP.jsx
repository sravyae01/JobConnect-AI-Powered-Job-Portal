import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("reset_email");

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      toast.error("Please enter OTP.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/verify-reset-otp/",
        {
          email,
          otp,
        }
      );

      toast.success(response.data.message);

      // Save OTP for reset password page
      localStorage.setItem("reset_otp", otp);

      navigate("/reset-password");

    } catch (error) {
      toast.error(
        error.response?.data?.error || "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center">
          Verify OTP
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Enter the OTP sent to
        </p>

        <p className="text-center font-semibold text-blue-600 mt-1">
          {email}
        </p>

        <form
          onSubmit={handleVerifyOTP}
          className="mt-8 space-y-5"
        >

          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <div className="text-center mt-6">

          <Link
            to="/forgot-password"
            className="text-blue-600 hover:underline"
          >
            Back
          </Link>

        </div>

      </div>

    </div>
  );
};

export default VerifyOTP;