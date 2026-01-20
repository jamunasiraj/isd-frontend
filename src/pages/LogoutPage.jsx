import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");

    // Redirect to login
    navigate("/login", { replace: true });
  }, [navigate]);

  return null; // no UI needed
};

export default LogoutPage;
