import React from "react";

const UserDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-emerald-700">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Ticket Summary */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Open Tickets</h2>
          <p className="text-gray-600">You have 5 open tickets to resolve.</p>
        </div>

        {/* Assigned Tickets */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Assigned Tickets</h2>
          <p className="text-gray-600">3 tickets are assigned to you.</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-600">Last login: 2 hours ago.</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
