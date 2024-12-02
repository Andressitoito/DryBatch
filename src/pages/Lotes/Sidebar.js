import React from "react";
import { AiOutlinePlusCircle } from 'react-icons/ai';

const Sidebar = ({ selectedProductCode, onSelectProduct, onAddProduct, products = [] }) => {
  return (
    <div className="w-full md:w-1/4 bg-primary p-4 text-white relative h-auto min-h-screen">
      <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
        Productos
        <button
          onClick={onAddProduct}
          className="bg-accent text-white p-1 rounded-full ml-2"
          style={{ fontSize: '36px' }}
          title="Crear Nuevo Producto"
        >
          <AiOutlinePlusCircle size={36} />
        </button>
      </h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.code}
            className={`cursor-pointer p-2 mb-2 rounded-lg ${
              selectedProductCode === product.code
                ? "bg-lightAccent"
                : "hover:bg-secondary"
            }`}
            onClick={() => onSelectProduct(product.code)}
          >
            {product.name} ({product.code})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
