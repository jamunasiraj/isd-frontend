import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const role = user?.roles?.[0]?.toUpperCase() || localStorage.getItem("role")?.toUpperCase() || "";

    if (role === "ADMIN") {
      navigate("/dashboard/admin");
    } else if (role) {
      navigate("/dashboard/user");
    } else {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="flex justify-center items-center min-h-screen text-gray-600">
      Redirecting to your dashboard...
    </div>
  );
};

export default DashboardPage;
