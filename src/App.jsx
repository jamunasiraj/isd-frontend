import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import FaviconSetter from "./components/FaviconSetter.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

// Role dashboards
import AdminDashboardPage from "./pages/AdminDashboardPage.jsx";
import UserDashboardPage from "./pages/UserDashboardPage.jsx";
import LogoutPage from "./pages/LogoutPage.jsx";
// Ticket pages
import TicketListPage from "./pages/TicketListPage.jsx";
import CreateTicketPage from "./pages/CreateTicketPage.jsx";
import TicketDetailPage from "./pages/TicketDetailPage.jsx";

// User management pages (admin)
import UserManagementPage from "./pages/UserManagementPage.jsx";
import CreateUserPage from "./pages/CreateUserPage.jsx";
import AdminUserPage from "./pages/AdminUserPage.jsx";
import AssignTicketPage from "./pages/AssignTicketPage.jsx";
import AuditLogPage from "./pages/AuditLogPage.jsx";



function App() {
  return (
    <AuthProvider>
      <FaviconSetter />
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" 
  element={<RegisterPage title="Create User" />}
/>
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Dashboard redirect by role */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
            <Route path="/dashboard/user" element={<UserDashboardPage />} />

             {/* Tickets */}
            <Route path="/tickets" element={<TicketListPage />} />
            <Route path="/tickets/create" element={<CreateTicketPage />} />
            <Route path="/tickets/:ticketId" element={<TicketDetailPage />} />

            {/* User Management (admin) */}
            <Route path="/admin/users" element={<UserManagementPage />} />
            <Route path="/admin/users/create" element={<CreateUserPage />} />
            <Route path="/admin/users/:userId" element={<AdminUserPage />} />
            <Route path="/tickets/assign" element={<AssignTicketPage />} />
            <Route path="/tickets/:ticketId/assign" element={<AssignTicketPage />}/>
            <Route path="/audit" element={<AuditLogPage />} />




            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
