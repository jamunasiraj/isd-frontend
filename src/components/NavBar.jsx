import React, { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-emerald-700">
          <Shield className="w-7 h-7" />
          ISD Portal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 font-medium">
          <NavLink to="/" className={linkStyle}>Home</NavLink>
          <NavLink to="/about" className={linkStyle}>About</NavLink>

          {!token && (
            <>
              <NavLink to="/login" className={linkStyle}>Login</NavLink>
              <NavLink
                to="/register"
                className="bg-emerald-100 text-emerald-700 rounded-md px-4 py-2 hover:bg-emerald-200 transition"
              >
                Register
              </NavLink>
            </>
          )}

          {token && (
            <>
              {isAdmin ? (
                <NavLink to="/dashboard/admin" className={linkStyle}>
                  Dashboard
                </NavLink>
              ) : (
                <NavLink to="/dashboard/user" className={linkStyle}>
                  Dashboard
                </NavLink>
              )}

              {/* Tickets (All Roles) */}
              <NavLink to="/tickets" end className={linkStyle}>
                Tickets
              </NavLink>
              <NavLink to="/tickets/create" className={linkStyle}>
                Create Ticket
              </NavLink>

              {/* Assign Ticket (Admin Only) */}
              {isAdmin && (
                <NavLink to="/tickets/assign" className={linkStyle}>
                  Assign Ticket
                </NavLink>
              )}

              {/* Admin Links */}
              {isAdmin && (
                <>
                  <NavLink to="/admin/users" className={linkStyle}>
                    Users
                  </NavLink>
                  <NavLink to="/audit" className={linkStyle}>
                    Audit Logs
                  </NavLink>
                </>
              )}

              {/* Auditor Links */}
              {isAuditor && (
                <NavLink to="/audit" className={linkStyle}>
                  Audit Logs
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 font-semibold"
              >
                Sign Out
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-emerald-700"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-3">
          <NavLink to="/" onClick={() => setOpen(false)} className={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className={linkStyle}>
            About
          </NavLink>

          {!token && (
            <>
              <NavLink to="/login" onClick={() => setOpen(false)} className={linkStyle}>
                Login
              </NavLink>
              <NavLink to="/register" onClick={() => setOpen(false)} className={linkStyle}>
                Register
              </NavLink>
            </>
          )}

          {token && (
            <>
              <NavLink to="/tickets" onClick={() => setOpen(false)} className={linkStyle}>
                Tickets
              </NavLink>
              <NavLink to="/tickets/create" onClick={() => setOpen(false)} className={linkStyle}>
                Create Ticket
              </NavLink>

              {isAdmin ? (
                <NavLink to="/dashboard/admin" onClick={() => setOpen(false)} className={linkStyle}>
                  Dashboard
                </NavLink>
              ) : (
                <NavLink to="/dashboard/user" onClick={() => setOpen(false)} className={linkStyle}>
                  Dashboard
                </NavLink>
              )}

              {isAdmin && (
                <>
                  <NavLink to="/tickets/assign" onClick={() => setOpen(false)} className={linkStyle}>
                    Assign Ticket
                  </NavLink>
                  <NavLink to="/admin/users" onClick={() => setOpen(false)} className={linkStyle}>
                    Users
                  </NavLink>
                  <NavLink to="/audit" onClick={() => setOpen(false)} className={linkStyle}>
                    Audit Logs
                  </NavLink>
                </>
              )}

              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="block w-full bg-red-600 text-white py-2 rounded-lg"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
