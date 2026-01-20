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

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-emerald-700"
        >
          <Shield className="w-7 h-7" />
          ISD Portal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          <NavLink to="/" className={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/about" className={linkStyle}>
            About
          </NavLink>

          {!token && (
            <>
              <NavLink to="/login" className={linkStyle}>
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "bg-emerald-600 text-white rounded-md px-4 py-2 font-semibold"
                    : "bg-emerald-100 text-emerald-700 rounded-md px-4 py-2 hover:bg-emerald-200 transition"
                }
              >
                Register
              </NavLink>
            </>
          )}

          {token && (
            <>
              {/* Role-based dashboard links */}
              {(role === "ADMIN" || role === "MANAGER" || role === "TEAMLEAD") && (
                <NavLink to="/dashboard/admin" className={linkStyle}>
                  Admin Dashboard
                </NavLink>
              )}
              {role === "USER" && (
                <NavLink to="/dashboard/user" className={linkStyle}>
                  User Dashboard
                </NavLink>
              )}
              {/* Add more role-based links if needed */}

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
          className="md:hidden text-emerald-700 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg px-4 py-4 space-y-4">
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
              <NavLink
                to="/register"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "block text-center bg-emerald-600 text-white py-2 rounded-lg"
                    : "block text-center bg-emerald-100 text-emerald-700 py-2 rounded-lg hover:bg-emerald-200 transition"
                }
              >
                Register
              </NavLink>
            </>
          )}

          {token && (
            <>
              {(role === "ADMIN" || role === "MANAGER" || role === "TEAMLEAD") && (
                <NavLink
                  to="/dashboard/admin"
                  onClick={() => setOpen(false)}
                  className={linkStyle}
                >
                  Admin Dashboard
                </NavLink>
              )}
              {role === "USER" && (
                <NavLink
                  to="/dashboard/user"
                  onClick={() => setOpen(false)}
                  className={linkStyle}
                >
                  User Dashboard
                </NavLink>
              )}

              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                className="block w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
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
