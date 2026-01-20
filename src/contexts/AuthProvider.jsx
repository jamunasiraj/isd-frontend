// src/context/AuthProvider.jsx
import React, { useState } from "react";
import AuthContext from "./AuthContext.jsx";
import { registerUser } from "../services/isdapi.js";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await registerUser(data);
      setUser(result.user || null); 
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const value = {
    user,
    loading,
    error,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
