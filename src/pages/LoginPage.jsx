import React, { useState } from "react";
import { Shield, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Login failed");
        return;
      }

      const data = await response.json();

      // Store token, username and first role
      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("username", data.username);
      localStorage.setItem("role", data.roles[0]);

      navigate("/dashboard");
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-cyan-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10">
        <div className="flex items-center justify-center mb-8">
          <Shield className="w-12 h-12 text-emerald-600" />
          <h2 className="ml-3 text-3xl font-extrabold text-emerald-700">
            ISD Portal Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-red-600 text-center font-semibold">{error}</div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full px-4 py-3 border rounded-xl"
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-3 border rounded-xl pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-xl"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-emerald-600 font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
