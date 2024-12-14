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
  const [selectedProductId, setSelectedProductId] = useState(null); // Use product ID for uniqueness
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);

  const fetchProducts = async () => {
    try {
      const data = await apiService.getAllProducts();
      setProducts(data);

      // Set default selected product only if none is selected
      if (data.length > 0 && selectedProductId === null) {
        setSelectedProductId(data[0].id);
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
    (product) => product.id === selectedProductId
  );

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
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

      // Refetch products to update state
      await fetchProducts();

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
      setSelectedProductId(newProduct.id); // Immediately select the new product by ID
      setIsNewProductModalOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
      <div className="flex flex-col md:flex-row h-auto min-h-screen w-full md:max-w-[1200px] mx-0 md:mx-auto px-0 md:px-4">

    <Sidebar
      selectedProductId={selectedProductId}
      onSelectProduct={handleProductSelect}
      onAddProduct={() => setIsNewProductModalOpen(true)}
      products={products}
    />
    <div className="flex-1 p-6 bg-background">
      <h1 className="text-2xl font-bold text-primary mb-4">
        <span className="font-bold">{selectedProduct?.name}</span>
      </h1>
  
      {user && user.username && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 bg-blue-500 text-white p-2 rounded"
        >
          + Agregar Medición
        </button>
      )}
  
      {selectedProduct?.Measurements?.length > 0 ? (
        <Table
          initialTime={selectedProduct.createdAt}
          measurements={selectedProduct.Measurements.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          )}
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
        existingProductIds={products.map((product) => product.id)}
      />
    </div>
  </div>
  
  );
};

export default Lotes;
