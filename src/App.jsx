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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Dashboard redirect by role */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
            <Route path="/dashboard/user" element={<UserDashboardPage />} />

            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
