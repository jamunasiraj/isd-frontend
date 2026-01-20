import { ClipboardList, Users, BarChart3 } from "lucide-react";
import HeroPage from "./HeroPage.jsx";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-cyan-50">
      {/* Hero Section */}
      <HeroPage />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Welcome to <span className="text-emerald-600">ISD</span>
        </h1>
        <p className="mt-2 text-gray-600">
          Manage IT incidents efficiently and transparently.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-20">
        <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-emerald-200 transition-all duration-300 border border-emerald-100">
          <ClipboardList className="w-10 h-10 text-emerald-600" />
          <h3 className="mt-4 text-xl font-semibold">
            Report Incidents
          </h3>
          <p className="mt-2 text-gray-600">
            Log IT issues quickly with priority and detailed descriptions.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-emerald-200 transition-all duration-300 border border-emerald-100">
          <Users className="w-10 h-10 text-emerald-600" />
          <h3 className="mt-4 text-xl font-semibold">
            Team Collaboration
          </h3>
          <p className="mt-2 text-gray-600">
            Engineers and team leads work together to resolve incidents.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-1 hover:ring-2 hover:ring-emerald-200 transition-all duration-300 border border-emerald-100">
          <BarChart3 className="w-10 h-10 text-emerald-600" />
          <h3 className="mt-4 text-xl font-semibold">
            Insights & Audits
          </h3>
          <p className="mt-2 text-gray-600">
            Monitor performance, SLAs, and audit logs with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
