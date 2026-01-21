// src/context/AuthProvider.jsx
import React, { useState } from "react";
import AuthContext from "./AuthContext.jsx";
import { registerUser } from "../services/isdapi.js";

const AuthProvider = ({ children }) => {
  // Lazy initialization from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await registerUser(data);
      const loggedInUser = result.user || null;

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const login = (loginResponse) => {
     const userData = {
    username: loginResponse.username,
    roles: loginResponse.roles,
    token: loginResponse.accessToken,
  };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

 

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
