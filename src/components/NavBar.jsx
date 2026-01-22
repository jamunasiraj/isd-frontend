import React, { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppNavLink from "./ui/AppNavLink.jsx";   // import your custom component
import AppButton from "./ui/AppButton.jsx";     // import your custom component

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-white bg-emerald-600 hover:bg-emerald-700 rounded-md px-3 py-2 block transition"
      : "text-emerald-700 hover:bg-emerald-100 hover:text-emerald-900 rounded-md px-3 py-2 block transition";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isAdmin = role === "ADMIN";
  const isAuditor = role === "AUDITOR";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <AppNavLink
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-emerald-700"
        >
          <Shield className="w-7 h-7" />
          ISD Portal
        </AppNavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <AppNavLink to="/" className={linkStyle}>Home</AppNavLink>
          <AppNavLink to="/about" className={linkStyle}>About</AppNavLink>

          {!token && (
            <>
              <AppNavLink to="/login" className={linkStyle}>Login</AppNavLink>
              <AppNavLink
                to="/register"
                className="bg-emerald-100 text-emerald-700 rounded-md px-4 py-2 hover:bg-emerald-200 transition"
              >
                Register
              </AppNavLink>
            </>
          )}

          {token && (
            <>
              {isAdmin ? (
                <AppNavLink to="/dashboard/admin" className={linkStyle}>Dashboard</AppNavLink>
              ) : (
                <AppNavLink to="/dashboard/user" className={linkStyle}>Dashboard</AppNavLink>
              )}

              {/* Tickets (All Roles) */}
              <AppNavLink to="/tickets" end className={linkStyle}>Tickets</AppNavLink>
              <AppNavLink to="/tickets/create" className={linkStyle}>Create Ticket</AppNavLink>

              {/* Assign Ticket (Admin Only) */}
              {isAdmin && (
                <AppNavLink to="/tickets/assign" className={linkStyle}>Assign Ticket</AppNavLink>
              )}

              {/* Admin Links */}
              {isAdmin && (
                <>
                  <AppNavLink to="/admin/users" className={linkStyle}>Users</AppNavLink>
                  <AppNavLink to="/audit" className={linkStyle}>Audit Logs</AppNavLink>
                </>
              )}

              {/* Auditor Links */}
              {isAuditor && (
                <AppNavLink to="/audit" className={linkStyle}>Audit Logs</AppNavLink>
              )}

              <AppButton
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Sign Out
              </AppButton>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <AppButton
          onClick={() => setOpen(!open)}
          className="md:hidden text-emerald-700"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </AppButton>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-3">
          <AppNavLink to="/" onClick={() => setOpen(false)} className={linkStyle}>
            Home
          </AppNavLink>
          <AppNavLink to="/about" onClick={() => setOpen(false)} className={linkStyle}>
            About
          </AppNavLink>

          {!token && (
            <>
              <AppNavLink to="/login" onClick={() => setOpen(false)} className={linkStyle}>
                Login
              </AppNavLink>
              <AppNavLink to="/register" onClick={() => setOpen(false)} className={linkStyle}>
                Register
              </AppNavLink>
            </>
          )}

          {token && (
            <>
              <AppNavLink to="/tickets" onClick={() => setOpen(false)} className={linkStyle}>
                Tickets
              </AppNavLink>
              <AppNavLink to="/tickets/create" onClick={() => setOpen(false)} className={linkStyle}>
                Create Ticket
              </AppNavLink>

              {isAdmin ? (
                <AppNavLink to="/dashboard/admin" onClick={() => setOpen(false)} className={linkStyle}>
                  Dashboard
                </AppNavLink>
              ) : (
                <AppNavLink to="/dashboard/user" onClick={() => setOpen(false)} className={linkStyle}>
                  Dashboard
                </AppNavLink>
              )}

              {isAdmin && (
                <>
                  <AppNavLink to="/tickets/assign" onClick={() => setOpen(false)} className={linkStyle}>
                    Assign Ticket
                  </AppNavLink>
                  <AppNavLink to="/admin/users" onClick={() => setOpen(false)} className={linkStyle}>
                    Users
                  </AppNavLink>
                  <AppNavLink to="/audit" onClick={() => setOpen(false)} className={linkStyle}>
                    Audit Logs
                  </AppNavLink>
                </>
              )}

              {isAuditor && (
                <AppNavLink to="/audit" onClick={() => setOpen(false)} className={linkStyle}>
                  Audit Logs
                </AppNavLink>
              )}

              <AppButton
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="block w-full bg-red-600 text-white py-2 rounded-lg"
              >
                Sign Out
              </AppButton>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
