import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "./Table";
import Modal from "./Modal";
import NewProductModal from "./NewProductModal";
import apiService from "../../services/apiService";

const Lotes = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductCode, setSelectedProductCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiService.getAllProducts();
        setProducts(data);
        // Set the default selected product if available
        if (data.length > 0) {
          setSelectedProductCode(data[0].code);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const selectedProduct = products.find((product) => product.code === selectedProductCode);

  // Debugging logs
  console.log("Selected Product:", selectedProduct);
  console.log("Measurements:", selectedProduct?.Measurements);

  const handleProductSelect = (productCode) => {
    setSelectedProductCode(productCode);
  };

  const handleAddMeasurement = async (newMeasurement) => {
    try {
      // Call the API to add the new measurement
      const updatedProduct = await apiService.addMeasurementToProduct(selectedProduct.id, newMeasurement);
      
      // Update the state with the updated product details
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding measurement:", error);
    }
  };

  const handleAddProduct = async (newProductData) => {
    try {
      // Call the API to add the new product
      const newProduct = await apiService.addProduct(newProductData);
      
      // Update the state with the new product
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setSelectedProductCode(newProduct.code);
      setIsNewProductModalOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-auto min-h-screen">
      <Sidebar
        selectedProductCode={selectedProductCode}
        onSelectProduct={handleProductSelect}
        onAddProduct={() => setIsNewProductModalOpen(true)}
        products={products}
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
        
        {selectedProduct && selectedProduct.Measurements && selectedProduct.Measurements.length > 0 ? (
          // Correctly pass the measurements to the table
          <Table measurements={selectedProduct.Measurements} />
        ) : (
          <p>No hay mediciones disponibles para este producto.</p>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          containers={selectedProduct?.Measurements?.[0]?.Containers || []}
          addMeasurement={handleAddMeasurement}
        />
        <NewProductModal
          isOpen={isNewProductModalOpen}
          onClose={() => setIsNewProductModalOpen(false)}
          addProduct={handleAddProduct}
          existingProductCodes={products.map(product => product.code)}
        />
      </div>
    </div>
  );
};

export default Lotes;
