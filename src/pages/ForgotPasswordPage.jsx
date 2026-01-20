import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      setMessage("");
      return;
    }
    setError("");
    // Simulate API call for password reset
    setMessage(
      `If an account with ${email} exists, a password reset link has been sent.`
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="flex items-center justify-center mb-8">
          <Mail className="w-12 h-12 text-emerald-600" />
          <h2 className="ml-3 text-3xl font-extrabold text-emerald-700">
            Forgot Password
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-600 text-center font-semibold">{error}</div>
          )}
          {message && (
            <div className="text-green-600 text-center font-semibold">{message}</div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Enter your email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-semibold hover:text-emerald-800"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
