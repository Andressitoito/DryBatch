import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Table from "./Table";
import Modal from "./Modal";
import NewProductModal from "./NewProductModal";
import { products as initialProducts, measurements as initialMeasurements } from "../../data/mockData";

const Lotes = () => {
  const [products, setProducts] = useState(initialProducts);
  const [measurements, setMeasurements] = useState(initialMeasurements);
  const [selectedProductCode, setSelectedProductCode] = useState("A001");
  const [measurementGroups, setMeasurementGroups] = useState([
    initialMeasurements[selectedProductCode],
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  const handleProductSelect = (productCode) => {
    setSelectedProductCode(productCode);
    setMeasurementGroups([measurements[productCode]]);
  };

  const handleAddMeasurement = (currentGrossValues) => {
    const newMeasurementGroup = measurementGroups[measurementGroups.length - 1].map(
      (measurement, index) => ({
        ...measurement,
        currentGross: parseFloat(currentGrossValues[index]),
        lastUpdatedBy: "Usuario Actual", // Placeholder for current user
        timestamp: new Date().toISOString(),
      })
    );
    setMeasurementGroups([...measurementGroups, newMeasurementGroup]);
  };

  const handleAddProduct = ({ name, code, containers }) => {
    const newProduct = { name, code };
    const newContainers = containers.map((container, index) => ({
      tare: parseFloat(container.tare),
      initialGross: parseFloat(container.initialGross),
      currentGross: parseFloat(container.initialGross),
      lastUpdatedBy: "Usuario Actual",
      timestamp: new Date().toISOString(),
      containerName: `Bandeja ${index + 1}`
    }));

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setMeasurements((prevMeasurements) => ({ ...prevMeasurements, [code]: newContainers }));
    setSelectedProductCode(code);
    setMeasurementGroups([newContainers]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Sidebar
        selectedProductCode={selectedProductCode}
        onSelectProduct={handleProductSelect}
        onAddProduct={() => setIsNewProductModalOpen(true)}
        products={products}
      />
      <div className="flex-1 p-6 bg-background">
        <h1 className="text-2xl font-bold text-primary mb-4">Mediciones de Secado para <span className="font-bold">{products.find(product => product.code === selectedProductCode)?.name}</span></h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 bg-accent text-white p-2 rounded"
        >
          + Agregar Medición
        </button>
        <Table measurements={measurementGroups} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          measurements={measurementGroups[measurementGroups.length - 1]}
          addMeasurement={handleAddMeasurement}
        />
        <NewProductModal
          isOpen={isNewProductModalOpen}
          onClose={() => setIsNewProductModalOpen(false)}
          addProduct={handleAddProduct}
        />
      </div>
    </div>
  );
};

export default Lotes;