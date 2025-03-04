import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "./Table";
import Modal from "./Modal";
import NewProductModal from "./NewProductModal";
import * as apiService from "../../services/apiService";
import { useUser } from "../../contexts/UserContext";

const Lotes = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await apiService.getAllProducts();
      setProducts(data);

      console.log("data ", data)

      // Set the initial selection if no product is selected
      if (!selectedProductId && data.length > 0) {
        const lastCreatedProduct = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];
        setSelectedProductId(lastCreatedProduct.id);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all products on initial render
  useEffect(() => {
    // In case fetching takes too long, stop loading after 30 seconds.
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 30000);

    fetchProducts();

    return () => clearTimeout(loadingTimeout);
    // eslint-disable-next-line 
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

  // If we're loading, render only the spinner.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Render the main UI when not loading
  return (
    <div className="flex flex-col md:flex-row h-auto min-h-screen w-full md:max-w-[1200px] mx-0 md:mx-auto px-0 md:px-4">
      <Sidebar
        selectedProductId={selectedProductId}
        onSelectProduct={handleProductSelect}
        onAddProduct={() => setIsNewProductModalOpen(true)}
        products={products}
      />
      <div className="flex-1 p-6 bg-background">
        <h1 className="text-primary mb-0">
          <span className="text-xl text-blue-500">Producto: </span><br/>
          <span className="font-bold text-2xl italic uppercase">
            {selectedProduct?.name}
          </span>
        </h1>
        <h1 className="text-primary mb-4">
          <span className="text-xl text-blue-500">Lote: </span><br/>
          <span className="font-bold text-2xl italic">
            {selectedProduct?.code}
          </span>
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
      </div>

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
  );
};

export default Lotes;
