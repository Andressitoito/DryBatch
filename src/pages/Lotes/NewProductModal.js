import React, { useState, useEffect } from "react";

const NewProductModal = ({ isOpen, onClose, addProduct }) => {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [containers, setContainers] = useState([{ tare: "", initialGross: "" }]);

  useEffect(() => {
    if (isOpen) {
      setProductName("");
      setProductCode("");
      setContainers([{ tare: "", initialGross: "" }]);
    }
  }, [isOpen]);

  const handleContainerChange = (index, field, value) => {
    const newContainers = [...containers];
    newContainers[index][field] = value;
    setContainers(newContainers);
  };

  const handleAddContainer = () => {
    setContainers([...containers, { tare: "", initialGross: "" }]);
  };

  const handleSubmit = () => {
    if (productName && productCode && containers.every((c) => c.tare && c.initialGross)) {
      addProduct({ name: productName, code: productCode, containers });
      onClose();
    } else {
      alert("Por favor complete todos los campos para crear un nuevo producto.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Crear Nuevo Producto</h2>
        <div className="mb-4">
          <label className="block mb-1">Nombre del Producto</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="border p-2 w-full"
            placeholder="Ingrese el nombre del producto"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Código del Producto</label>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            className="border p-2 w-full"
            placeholder="Ingrese el código del producto"
          />
        </div>
        <h3 className="text-lg font-bold mb-2">Bandejas</h3>
        {containers.map((container, index) => (
          <div key={index} className="mb-2">
            <label className="block mb-1">Tara de la Bandeja {index + 1} (kg)</label>
            <input
              type="number"
              value={container.tare}
              onChange={(e) => handleContainerChange(index, "tare", e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Ingrese la tara de la bandeja"
            />
            <label className="block mb-1">Peso Bruto Inicial (kg)</label>
            <input
              type="number"
              value={container.initialGross}
              onChange={(e) => handleContainerChange(index, "initialGross", e.target.value)}
              className="border p-2 w-full"
              placeholder="Ingrese el peso bruto inicial"
            />
          </div>
        ))}
        <button
          onClick={handleAddContainer}
          className="bg-secondary text-white p-2 rounded mt-2"
        >
          + Agregar Bandeja
        </button>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-500 text-white p-2 rounded mr-2">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="bg-primary text-white p-2 rounded">
            Crear Producto
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProductModal;