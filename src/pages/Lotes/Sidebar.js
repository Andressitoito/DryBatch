import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai"; // Icon to indicate creation-based sorting
import { FaSortAlphaDown } from "react-icons/fa"; // Icon to indicate name-based sorting
import { useUser } from "../../contexts/UserContext"; // Import the UserContext

const Sidebar = ({ selectedProductId, onSelectProduct, onAddProduct, products }) => {
  const { user } = useUser(); // Access the current user from context

  const [sortBy, setSortBy] = useState("creation");

  // Sort products based on sortBy state
  const sortedProducts = [...products];
  if (sortBy === "creation") {
    // Sort by creation date (earliest first)
    sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (sortBy === "name") {
    // Sort by name alphabetically
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  // Toggle sortBy when the button is clicked
  const toggleSort = () => {
    setSortBy((prev) => (prev === "creation" ? "name" : "creation"));
  };

  return (
    <div className="w-full md:w-1/4 bg-primary p-4 text-white relative h-auto min-h-screen">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        Productos
        {user?.username && (
          <button
            onClick={() => onAddProduct()}
            className="bg-blue-500 text-white p-1.5 rounded-full ml-2 flex items-center justify-center"
            style={{ fontSize: "30px" }}
            title="Crear Nuevo Producto"
          >
            <AiOutlinePlus size={24} />
          </button>
        )}
      </h2>

      {/* Absolute positioned sort toggle button */}
      <button
        onClick={toggleSort}
        className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full flex items-center justify-center"
        title={`Ordenar por ${sortBy === "creation" ? "Nombre" : "Creación"}`}
      >
        {sortBy === "creation" ? (
          <FaSortAlphaDown size={18} />
        ) : (
          <AiOutlineClockCircle size={18} />
        )}
      </button>

      <ul>
        {sortedProducts.map((product) => (
          <li
            key={product.id} // Use product.id as the unique key
            className={`cursor-pointer p-2 mb-2 rounded-lg ${
              selectedProductId === product.id
                ? "bg-lightAccent"
                : "hover:bg-secondary"
            }`}
            onClick={() => onSelectProduct(product.id)} // Pass product.id
          >
            {product.name} ({product.code})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
