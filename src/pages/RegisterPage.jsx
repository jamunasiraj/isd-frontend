import React, { useState } from "react";
import { Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/isdapi";

const roles = [
  "USER",
  "SUPPORT_ENGINEER",
  "ADMIN",
  "MANAGER",
  "OBSERVER",
  "AUDITOR",
  "TEAMLEAD",
];

const RegisterPage = ({ title = "ISD Portal Register" }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: roles[0],
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { username, email, password, role } = formData;

    // Basic validation
    if (!username || !email || !password || !role) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await registerUser(formData);
      setSuccess("User created successfully! Redirecting...");

      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/admin/users"); // Admin: go to User Management page
          //navigate("/");
        } else {

          navigate("/login"); // Others: go to login page
        }
      }, 1500);
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="flex items-center justify-center mb-8">
          <Shield className="w-12 h-12 text-emerald-600" />
          <h2 className="ml-3 text-3xl font-extrabold text-emerald-700">
            {title}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-600 text-center font-semibold">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-center font-semibold">{success}</div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Your username"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              required
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-xl hover:bg-emerald-700 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
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

export default RegisterPage;
