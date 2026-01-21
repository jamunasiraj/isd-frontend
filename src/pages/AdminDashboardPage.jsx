import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import RoleUi from "../components/RoleUi.jsx"; // Import RoleUi

const AdminDashboardPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">
        👋 Welcome, {user?.username || "Admin"}
      </h1>

      {/* Show Role Badge */}
      <div className="mb-6">
        <RoleUi /> {/* RoleUi reads role from localStorage */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Management */}
        <Link
          to="/admin/users"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
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
        </Link>

        {/* Ticket Overview */}
        <Link
          to="/tickets"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
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
        </Link>

        {/* Audit Logs */}
        <Link
          to="/audit"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
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
        </Link>
      </div>

      {/* Extra Section - News, Awards, Facts */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
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

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
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

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
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
