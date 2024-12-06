import axios from 'axios';

// Set up the base URL for the API calls using the environment variable
const BASE_URL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
});

// Interceptor to log requests and responses (optional, for debugging)
// api.interceptors.request.use((config) => {
//   console.log(`Request: ${config.method.toUpperCase()} ${config.url}`, config.data);
//   return config;
// });

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error(`Error in response:`, error.response || error.message);
//     return Promise.reject(error);
//   }
// );

// --- Auth APIs ---

// Login API call
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // Return response data (e.g., user session)
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
    throw error; // Throw error to be handled by the caller
  }
};

// Logout API call
export const logout = async () => {
  try {
    const response = await api.post('/auth/logout', {}, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // Return logout success message
  } catch (error) {
    console.error('Error during logout:', error.response?.data || error.message);
    throw error; // Throw error to be handled by the caller
  }
};

// Create User API call
export const createUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // Return response data (e.g., user creation success message)
  } catch (error) {
    console.error('Error during user creation:', error.response?.data || error.message);
    throw error; // Throw error to be handled by the caller
  }
};

// --- Product APIs ---

// Fetch all products including measurements and containers
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products'); // Use api.get() correctly with endpoint appended
    return response.data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
};

// Fetch a specific product by ID, including measurements and containers
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`); // Proper usage of api instance
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Create a new product with measurements and containers
export const addProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Add a new measurement to an existing product
export const addMeasurementToProduct = async (productId, newMeasurement) => {
  try {
    const response = await api.post(`/products/${productId}/measurements`, newMeasurement, {
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
    const response = await api.put(`/products/${id}`, updateData, {
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
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

const apiService = {
  login,
  logout, // Added logout function
  createUser, // Added createUser function
  getAllProducts,
  getProductById,
  addProduct,
  addMeasurementToProduct,
  updateProduct,
  deleteProduct,
};

export default apiService;
