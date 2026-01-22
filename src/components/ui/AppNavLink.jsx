import { NavLink } from "react-router-dom";

const AppNavLink = ({ to, className, children, onClick, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={className}
    >
      {children}
    </NavLink>
  );
};
export default AppNavLink;