import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";

const Navbar = () => {
  const { user, clearUser } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearUser();
  };

  return (
    <header className="font-lato">
      <nav className="bg-gray-300 text-gray-700 shadow-sm text-primary">
        <div className="container mx-auto p-2">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              <NavLink to="/" className={({ isActive }) =>
                `px-3 py-1 rounded-md transition-all duration-200 ${isActive ? "bg-blue-400 text-white font-bold" : "hover:bg-blue-100 hover:text-blue-600"}`
              }>
                Inicio
              </NavLink>
              {user && (
                <NavLink to="/lotes" className={({ isActive }) =>
                  `px-3 py-1 rounded-md transition-all duration-200 ${isActive ? "bg-blue-400 text-white font-bold" : "hover:bg-blue-100 hover:text-blue-600"}`
                }>
                  Lotes
                </NavLink>
              )}
              <NavLink to="/about" className={({ isActive }) =>
                `hidden md:block px-3 py-1 rounded-md transition-all duration-200 ${isActive ? "bg-blue-400 text-white font-bold" : "hover:bg-blue-100 hover:text-blue-600"}`
              }>
                Acerca de Nosotros
              </NavLink>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <>
                    <span className="text-gray-700">{user.username}</span>
                    <button
                      onClick={handleLogout}
                      className="p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-colors duration-200"
                      title="Cerrar Sesión"
                    >
                      <FaSignOutAlt className="text-xl" />
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `p-2 rounded-md transition-colors duration-200 ${isActive ? "bg-blue-600 text-white font-bold" : "hover:bg-blue-100 hover:text-blue-600"}`
                    }
                    title="Iniciar Sesión"
                  >
                    <FaSignInAlt className="text-xl" />
                  </NavLink>
                )}
              </div>
              <button
                className="md:hidden text-2xl text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div
              ref={menuRef}
              className="md:hidden bg-gray-200 text-gray-700 space-y-4 p-4 mt-2 rounded-md shadow-lg"
            >
              {user ? (
                <>
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-600" />
                    <span>{user.username}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
                  >
                    <FaSignOutAlt className="inline-block mr-2" /> Cerrar Sesión
                  </button>
                </>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md transition-all duration-200 ${isActive ? "bg-blue-600 text-white font-bold" : "hover:bg-blue-100 hover:text-blue-600"}`
                  }
                >
                  <FaSignInAlt className="inline-block mr-2" /> Iniciar Sesión
                </NavLink>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
