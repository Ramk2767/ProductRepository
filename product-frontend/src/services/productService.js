import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/products`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const productService = {
  getProducts: async () => {
    try {
      const response = await apiClient.get('');
      return response.data;
    } catch (error) {
      handleError(error, 'Unable to load products. Please try again.');
    }
  },

  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error('Product not found.');
      }
      handleError(error, 'Unable to load product details.');
    }
  },

  createProduct: async (product) => {
    try {
      const response = await apiClient.post('', product);
      return response.data;
    } catch (error) {
      handleError(error, 'Unable to create product.');
    }
  },

  updateProduct: async (id, product) => {
    try {
      const response = await apiClient.put(`/${id}`, product);
      return response.data;
    } catch (error) {
      handleError(error, 'Unable to update product.');
    }
  }
};

const handleError = (error, defaultMessage) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.response.status === 400) throw new Error('Invalid request. Please check your data.');
    if (error.response.status === 404) throw new Error('Product not found.');
    if (error.response.status >= 500) throw new Error('Internal server error.');
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('Unable to connect to the server. Please ensure the backend is running.');
  }
  
  // Something happened in setting up the request that triggered an Error
  throw new Error(defaultMessage);
};
