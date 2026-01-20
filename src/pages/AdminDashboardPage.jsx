import React from "react";

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-indigo-700">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Management */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">User Management</h2>
          <p className="text-gray-600">Manage all users, roles, and permissions.</p>
        </div>

        {/* Ticket Overview */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Tickets Overview</h2>
          <p className="text-gray-600">View all tickets and their statuses.</p>
        </div>

        {/* Audit Logs */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Audit Logs</h2>
          <p className="text-gray-600">Track all system and user activities.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
