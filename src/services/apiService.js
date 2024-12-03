// src/services/apiService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8000/products';

// Fetch all products including measurements and containers
export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

// Fetch a specific product by ID, including measurements and containers
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Create a new product with measurements and containers
export const addProduct = async (productData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, productData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Add a new measurement to an existing product
export const addMeasurementToProduct = async (productId, measurementData) => {
  try {
    const response = await axios.post(`${BASE_URL}/${productId}/measurements`, measurementData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding measurement to product with ID ${productId}:`, error);
    throw error;
  }
};

// Update a product's details (name, code)
export const updateProduct = async (id, updateData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, updateData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

const apiService = {
  getAllProducts,
  getProductById,
  addProduct,
  addMeasurementToProduct,
  updateProduct,
  deleteProduct,
};

export default apiService;