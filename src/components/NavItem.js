import React from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext"; // Adjust path as needed

const NavItem = ({ name, to, authRequired = false, className = "" }) => {
  const { user } = useUser();

  // If auth is required and no user is logged in, don't render the link
  if (authRequired && !user) {
    return null;
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-1 rounded-md transition-all duration-200 ${isActive ? "bg-blue-400 text-white font-bold" : "hover:bg-blue-100 hover:text-blue-600"} ${className}`
      }
    >
      {name}
    </NavLink>
  );
};

export default NavItem;