import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "./Table";
import Modal from "./Modal";
import NewProductModal from "./NewProductModal";
import * as apiService from "../../services/apiService";
import { useUser } from "../../contexts/UserContext";

const Lotes = () => {
  const { user } = useUser(); // Access the current user from context
  const [products, setProducts] = useState([]);
  const [selectedProductCode, setSelectedProductCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await apiService.getAllProducts();
      setProducts(data);
      if (data.length > 0) {
        setSelectedProductCode(data[0].code); // Default to the first product
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch all products on initial render
  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedProduct = products.find(
    (product) => product.code === selectedProductCode
  );

  const handleProductSelect = (productCode) => {
    setSelectedProductCode(productCode);
  };

  const handleAddMeasurement = async (productId, newMeasurement) => {
    try {
      if (!productId) {
        console.error("No product ID available for adding measurement");
        return;
      }

      // Call the backend to add the measurement
      await apiService.addMeasurementToProduct(productId, newMeasurement);

      // Fetch the updated product data
      const updatedProduct = await apiService.getProductById(productId);

      // Update the product state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );

      // Ensure `Measurements` are ordered correctly
      if (updatedProduct.Measurements) {
        updatedProduct.Measurements.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
      }

      await fetchProducts()
      // Close the modal after success
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding measurement:", error);
    }
  };

  const handleAddProduct = async (newProductData) => {
    try {
      const newProduct = await apiService.addProduct(newProductData);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setSelectedProductCode(newProduct.code); // Immediately select the new product
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
          Mediciones de Secado para{" "}
          <span className="font-bold">{selectedProduct?.name}</span>
        </h1>

        {user?.username && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 bg-accent text-white p-2 rounded"
          >
            + Agregar Medición
          </button>
        )}

        {selectedProduct?.Measurements?.length > 0 ? (
          <Table
            initialTime={selectedProduct.createdAt}
            measurements={selectedProduct.Measurements.sort(
              (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
            )} // Sort measurements newest to oldest
          />
        ) : (
          <p>No hay mediciones disponibles para este producto.</p>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          containers={selectedProduct?.Measurements?.[0]?.Containers || []}
          latestContainers={selectedProduct?.Measurements?.[0]?.Containers || []}
          addMeasurement={handleAddMeasurement}
          productId={selectedProduct?.id}
        />

        <NewProductModal
          isOpen={isNewProductModalOpen}
          onClose={() => setIsNewProductModalOpen(false)}
          addProduct={handleAddProduct}
          existingProductCodes={products.map((product) => product.code)}
        />
      </div>
    </div>
  );
};

export default Lotes;
