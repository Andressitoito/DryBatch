import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "./Table";
import Modal from "./Modal";
import NewProductModal from "./NewProductModal";
import { useUser } from "../../contexts/UserContext";

// Mock data (since we’re not fetching yet)
const mockProducts = [
  {
    id: 18,
    name: "Fingolimod 1er Paso",
    code: "00031",
    createdAt: "2025-02-15T08:41:11.000Z",
    updatedAt: "2025-02-15T08:41:30.000Z",
    DelayEvents: [
      {
        id: 1,
        description: "Corte de luz Edesur",
        deadTime: 120,
        date: "2025-02-15T09:00:00.000Z",
        updatedBy: "Juan Manuel Marangon",
        reasonCode: 4,
      },
      {
        id: 2,
        description: "Calibracion de campanas",
        deadTime: 45,
        date: "2025-02-17T10:00:00.000Z",
        updatedBy: "Emiliano Troncoso",
        reasonCode: 1,
      },
    ],
  },
  {
    id: 19,
    name: "Fingolimod Base",
    code: "00036",
    createdAt: "2025-02-22T14:39:28.000Z",
    updatedAt: "2025-02-22T14:39:28.000Z",
    DelayEvents: [
      {
        id: 3,
        description: "Falta de personal en kilolab por problemas medicos",
        deadTime: 90,
        date: "2025-02-22T15:00:00.000Z",
        updatedBy: "Juan Manuel Marangon",
        reasonCode: 2,
      },
      {
        id: 4,
        description: "Se rompieron los HPLCs y no hay equipos disponibles",
        deadTime: 160,
        date: "2025-02-24T10:30:00.000Z",
        updatedBy: "Ignacio Orlandella",
        reasonCode: 3,
      },
      {
        id: 5,
        description: "Destapado de canierias de refrigeracion del R-3",
        deadTime: 180,
        date: "2025-02-24T11:00:00.000Z",
        updatedBy: "Ignacio Orlandella",
        reasonCode: 1,
      },
    ],
  },
];

const History = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching products with mock data
  const fetchProducts = async () => {
    try {
      // Use mockProducts instead of API call
      setProducts(mockProducts);

      // Set the initial selection to the most recently created product
      if (!selectedProductId && mockProducts.length > 0) {
        const lastCreatedProduct = [...mockProducts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];
        setSelectedProductId(lastCreatedProduct.id);
      }
    } catch (error) {
      console.error("Error setting mock products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
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

  const handleAddDelayEvent = async (productId, newDelayEvent) => {
    // This will be implemented later with the API
    try {
      if (!productId) {
        console.error("No product ID available for adding delay event");
        return;
      }
      // For now, simulate adding it to the state
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? {
                ...product,
                DelayEvents: [...product.DelayEvents, {
                  ...newDelayEvent,
                  id: product.DelayEvents.length + 1, // Simple ID assignment for mock
                }],
              }
            : product
        )
      );
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding delay event:", error);
    }
  };

  const handleAddProduct = async (newProductData) => {
    // This will use the API later, for now, just simulate
    try {
      const newProduct = { ...newProductData, id: products.length + 1, DelayEvents: [] };
      setProducts((prevProducts) => [...prevProducts, newProduct]);
      setSelectedProductId(newProduct.id);
      setIsNewProductModalOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-auto min-h-screen w-full md:max-w-[1200px] mx-0 md:mx-auto px-0 md:px-4">
      <Sidebar
        selectedProductId={selectedProductId}
        onSelectProduct={handleProductSelect}
        onAddProduct={() => setIsNewProductModalOpen(true)}
        products={products}
      />
      <div className="flex-1 p-6 bg-background">
        <h1 className="text-primary mb-4">
          <span className="text-xl text-blue-500">Producto: </span>
          <br />
          <span className="font-bold text-2xl italic uppercase">
            {selectedProduct?.name}
          </span>
        </h1>
        <h1 className="text-primary mb-4">
          <span className="text-xl text-blue-500">Lote: </span>
          <br />
          <span className="font-bold text-2xl italic">
            {selectedProduct?.code}
          </span>
        </h1>
        {user && user.username && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="mb-4 bg-blue-500 text-white p-2 rounded"
          >
            + Agregar Evento de Retraso
          </button>
        )}

        {selectedProduct?.DelayEvents?.length > 0 ? (
          <Table
            initialTime={selectedProduct.createdAt}
            delayEvents={selectedProduct.DelayEvents.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            )}
          />
        ) : (
          <p>No hay eventos de retraso disponibles para este producto.</p>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addDelayEvent={handleAddDelayEvent}
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

export default History;