import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    switch (role) {
      case "ADMIN":
        navigate("/dashboard/admin");
        break;
      case "USER":
        navigate("/dashboard/user");
        break;
      case "SUPPORT_ENGINEER":
        navigate("/dashboard/support-engineer");
        break;
      case "MANAGER":
        navigate("/dashboard/manager");
        break;
      case "OBSERVER":
        navigate("/dashboard/observer");
        break;
      case "AUDITOR":
        navigate("/dashboard/auditor");
        break;
      case "TEAMLEAD":
        navigate("/dashboard/teamlead");
        break;
      default:
        navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default DashboardPage;
