import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">DryBatch</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:underline">Inicio</Link>
          </li>
          <li>
            <Link to="/lotes" className="hover:underline">Lotes</Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">Iniciar Sesión</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
