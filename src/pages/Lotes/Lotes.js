// Lotes.js
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Table from "./Table";
import Modal from "./Modal";
import NewProductModal from "./NewProductModal";
import { products as initialProducts } from "../../data/mockData";

const Lotes = () => {
  // Ensure products is initialized as an empty array if initialProducts is undefined
  const [products, setProducts] = useState(initialProducts || []);
  const [selectedProductCode, setSelectedProductCode] = useState(products[0]?.code || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  const selectedProduct = products.find((product) => product.code === selectedProductCode);
  const currentMeasurement = selectedProduct?.Measurements?.[0] || {};

  // Updated to handle product selection
  const handleProductSelect = (productCode) => {
    setSelectedProductCode(productCode);
  };

  // Updated to handle adding new measurements to the selected product
  const handleAddMeasurement = (newMeasurement) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.code === selectedProductCode) {
          const previousMeasurement = product.Measurements[product.Measurements.length - 1];

          const updatedContainers = newMeasurement.containers.map((container, index) => {
            const previousContainer = previousMeasurement?.containers[index];
            const lossSinceLast = previousContainer
              ? parseFloat(previousContainer.currentGross) - parseFloat(container.currentGross)
              : 0;

            return {
              ...container,
              lossSinceLast, // Add a field to track the loss since last measurement
            };
          });

          return {
            ...product,
            Measurements: [
              ...product.Measurements,
              {
                ...newMeasurement,
                containers: updatedContainers,
              },
            ],
          };
        }
        return product;
      })
    );
    setIsModalOpen(false);
  };

  // Updated to add new product
  const handleAddProduct = ({ productName, productCode, containers }) => {
    const newProduct = {
      id: products.length + 1,
      name: productName,  // Use the correct parameter
      code: productCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      Measurements: [
        {
          id: 1,
          timestamp: new Date().toISOString(),
          lastUpdatedBy: "Usuario Actual",
          containers: containers.map((container) => ({
            tare: parseFloat(container.tare),
            initialGross: parseFloat(container.initialGross),
            currentGross: parseFloat(container.initialGross),
          })),
        },
      ],
    };
  
    console.log("New product created:", newProduct);
  
    // Update products and select the newly added product
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setSelectedProductCode(productCode);  // Make sure to select the new product
  
    setIsNewProductModalOpen(false);
  };
  
  
  return (
    <div className="flex flex-col md:flex-row h-auto min-h-screen">
      <Sidebar
        selectedProductCode={selectedProductCode}
        onSelectProduct={handleProductSelect}
        onAddProduct={() => setIsNewProductModalOpen(true)}
        products={products} // Ensure products is never undefined
      />
      <div className="flex-1 p-6 bg-background">
        <h1 className="text-2xl font-bold text-primary mb-4">
          Mediciones de Secado para <span className="font-bold">
            {selectedProduct?.name}
          </span>
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 bg-accent text-white p-2 rounded"
        >
          + Agregar Medición
        </button>
        <Table measurements={selectedProduct?.Measurements || []} />
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          containers={currentMeasurement?.containers || []}
          addMeasurement={handleAddMeasurement}
        />
        <NewProductModal
          isOpen={isNewProductModalOpen}
          onClose={() => setIsNewProductModalOpen(false)}
          addProduct={handleAddProduct}
          existingProductCodes={products ? products.map(product => product.code) : []} // Ensure products is defined before mapping
        />
      </div>
    </div>
  );
};

export default Lotes;
