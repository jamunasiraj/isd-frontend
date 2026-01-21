import React from "react";

const RoleUi = () => {
  // Get role from localStorage
  const role = localStorage.getItem("role");

  // Define badge data for roles
  const roleBadges = {
    ADMIN: { icon: "🛡️", label: "Admin", colorClass: "bg-yellow-600 text-white" },
    AUDITOR: { icon: "🔍", label: "Auditor", colorClass: "bg-blue-600 text-white" },
    TEAMLEAD: { icon: "👔", label: "Team Lead", colorClass: "bg-green-600 text-white" },
    SUPPORT_ENGINEER: { icon: "🛠️", label: "Support Engineer", colorClass: "bg-yellow-600 text-white" },
    MANAGER: { icon: "📋", label: "Manager", colorClass: "bg-purple-600 text-white" },
    OBSERVER: { icon: "👀", label: "Observer", colorClass: "bg-gray-600 text-white" },
  };

  // Fallback badge for unknown role
  const badge = roleBadges[role] || { icon: "👤", label: "User", colorClass: "bg-gray-400 text-white" };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${badge.colorClass}`}
      title={`Role: ${badge.label}`}
    >
      <span>{badge.icon}</span>
      <span>{badge.label}</span>
    </div>
  );
};

export default RoleUi;
