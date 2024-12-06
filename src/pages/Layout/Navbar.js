import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const { auth, login, logout } = useAuth(); // Use global auth state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close burger menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debug function to toggle authentication
  const toggleAuthState = () => {
    if (auth.isAuthenticated) {
      logout();
    } else {
      login("Usuario Debug");
    }
  };

  return (
    <header className="font-lato">
      {/* Main Navbar */}
      <nav className="bg-blue-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/path-to-logo.png" alt="DryBatch Logo" className="h-8 w-8" />
            <h1 className="text-2xl font-bold hidden md:block">DryBatch</h1>
          </div>

          {/* Profile Picture and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Full Width Menu Links */}
            <div className="hidden md:flex space-x-4 items-center">
              {auth.isAuthenticated ? (
                <>
                  <span className="hidden md:inline">{auth.username}</span>
                  <Link
                    to="/profile"
                    className="p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                    title="Perfil"
                  >
                    <FaUser className="text-xl" />
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                    title="Cerrar Sesión"
                  >
                    <FaSignOutAlt className="text-xl" />
                  </button>
                  <img
                    src="/path-to-profile-photo.jpg"
                    alt="Profile"
                    className="h-8 w-8 rounded-full border border-gray-300"
                  />
                </>
              ) : (
                <Link
                  to="/login"
                  className="p-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                  title="Iniciar Sesión"
                >
                  <FaSignInAlt className="text-xl" />
                </Link>
              )}
            </div>

            {/* Burger Menu Button */}
            <button
              className="md:hidden text-2xl"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            ref={menuRef}
            className="md:hidden bg-blue-800 text-white space-y-4 p-4"
          >
            {auth.isAuthenticated ? (
              <>
                <span className="block px-3 py-1">{auth.username}</span>
                <Link
                  to="/profile"
                  className="block px-3 py-1 rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                  <FaUser className="inline-block mr-2" /> Perfil
                </Link>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 py-1 rounded-md hover:bg-blue-600 transition-all duration-200"
                >
                  <FaSignOutAlt className="inline-block mr-2" /> Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-1 rounded-md hover:bg-blue-600 transition-all duration-200"
              >
                <FaSignInAlt className="inline-block mr-2" /> Iniciar Sesión
              </Link>
            )}
          </div>
        )}
      </nav>

      {/* Secondary Navbar */}
      <nav className="bg-gray-100 text-gray-700 p-2 shadow-sm">
        <div className="container mx-auto flex justify-center space-x-8">
          <Link
            to="/"
            className="px-3 py-1 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            Inicio
          </Link>
          <Link
            to="/lotes"
            className="px-3 py-1 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            Lotes
          </Link>
          <Link
            to="/contact"
            className="px-3 py-1 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            Contacto
          </Link>
          <Link
            to="/about"
            className="px-3 py-1 rounded-md hover:bg-blue-100 hover:text-blue-600 transition-all duration-200"
          >
            Acerca de Nosotros
          </Link>
        </div>
      </nav>

      {/* Debug Button */}
      <div className="mt-4 text-center">
        <button
          onClick={toggleAuthState}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          {auth.isAuthenticated ? "Simular Logout" : "Simular Login"}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
