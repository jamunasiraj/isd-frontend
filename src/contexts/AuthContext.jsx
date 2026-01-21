import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

// AuthProvider manages user state and loads user from localStorage asynchronously
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Async function to load user data (simulate or extend as needed)
    const loadUser = async () => {
      // Load user from localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
