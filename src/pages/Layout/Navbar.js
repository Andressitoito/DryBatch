import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { useUser } from "../../contexts/UserContext";
import NavItem from "../../components/NavItem"; // Adjust path as needed

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
              <NavItem name="Inicio" to="/" />
              <NavItem name="Historial" to="/historial" />
              <NavItem name="Lotes" to="/lotes" authRequired />
              <NavItem
                name="Acerca de Nosotros"
                to="/about"
                className="hidden md:block"
              />
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
                  <NavItem
                    name={<FaSignInAlt className="text-xl" />}
                    to="/login"
                    className="p-2"
                  />
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
                <NavItem
                  name={
                    <>
                      <FaSignInAlt className="inline-block mr-2" /> Iniciar Sesión
                    </>
                  }
                  to="/login"
                  className="block"
                />
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;