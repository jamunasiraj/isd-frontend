import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import RoleUi from "../components/RoleUi.jsx"; 

const UserDashboardPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">
        👋 Welcome, {user?.username}
      </h1>
      
      {/* Show Role Badge */}
      <div className="mb-6">
        {/* Removed passing role as prop since RoleUi reads role itself */}
        <RoleUi />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Open Tickets */}
        <Link
          to="/tickets"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
        >
          <h2 className="text-xl font-semibold mb-2">Open Tickets</h2>
          <div className="mt-4 text-emerald-500 text-4xl text-center">📂</div>
        </Link>

        {/* Created Tickets */}
        <Link
          to="/tickets/create"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition block"
        >
          <h2 className="text-xl font-semibold mb-2">Create Tickets</h2>
          <div className="mt-4 text-purple-500 text-4xl text-center">📋</div>
        </Link>
      </div>

      {/* Extra Section - News, Awards, Facts */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Latest News</h2>
          <p className="text-gray-600">Stay updated with recent announcements.</p>
          <div className="mt-4 text-yellow-500 text-4xl text-center">📰</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Awards & Recognition</h2>
          <p className="text-gray-600">Celebrating our team's achievements.</p>
          <div className="mt-4 text-pink-500 text-4xl text-center">🏆</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold mb-2">Did You Know?</h2>
          <p className="text-gray-600">Interesting facts to keep you motivated.</p>
          <div className="mt-4 text-teal-500 text-4xl text-center">💡</div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
