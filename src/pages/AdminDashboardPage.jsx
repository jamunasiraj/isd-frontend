import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import RoleUi from "../components/RoleUi.jsx";
import AppButton from "../components/ui/AppButton.jsx";

const AdminDashboardPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const buttonBaseClasses =
    "bg-white p-6 rounded-xl border border-gray-300 hover:border-emerald-500 shadow-sm hover:shadow-lg hover:scale-[1.03] transition transform duration-300 ease-in-out block text-left";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">
        👋 Welcome, {user?.username || "Admin"}
      </h1>

      <div className="mb-6">
        <RoleUi />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AppButton
          className={buttonBaseClasses}
          onClick={() => handleNavigate("/admin/users")}
        >
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-gray-600">Manage all users, roles, and permissions.</p>
          <div className="mt-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
              alt="User Management"
              className="mx-auto h-16 w-16"
            />
          </div>
        </AppButton>

        <AppButton
          className={buttonBaseClasses}
          onClick={() => handleNavigate("/tickets")}
        >
          <h2 className="text-xl font-semibold mb-2">Tickets Overview</h2>
          <p className="text-gray-600">View all tickets and their statuses.</p>
          <div className="mt-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png"
              alt="Tickets Overview"
              className="mx-auto h-16 w-16"
            />
          </div>
        </AppButton>

        <AppButton
          className={buttonBaseClasses}
          onClick={() => handleNavigate("/audit")}
        >
          <h2 className="text-xl font-semibold mb-2">Audit Logs</h2>
          <p className="text-gray-600">Track all system and user activities.</p>
          <div className="mt-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1087/1087563.png"
              alt="Audit Logs"
              className="mx-auto h-16 w-16"
            />
          </div>
        </AppButton>
      </div>

      {/* Extra Section - News, Awards, Facts */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Latest News</h2>
          <p className="text-gray-600">Stay updated with recent announcements.</p>
          <div className="mt-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2170/2170481.png"
              alt="News"
              className="mx-auto h-16 w-16"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Awards & Recognition</h2>
          <p className="text-gray-600">Celebrating our team's achievements.</p>
          <div className="mt-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616408.png"
              alt="Awards"
              className="mx-auto h-16 w-16"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Did You Know?</h2>
          <p className="text-gray-600">Interesting facts to keep you motivated.</p>
          <div className="mt-4 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
              alt="Facts"
              className="mx-auto h-16 w-16"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
