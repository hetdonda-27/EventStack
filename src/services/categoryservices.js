import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; 

export const getCategories = async () => {
  try {
    console.log('Fetching categories from:', `${API_BASE_URL}/categories`);
    const response = await axios.get(`${API_BASE_URL}/categories`);
    console.log('Categories API response:', response.data);

    if (!Array.isArray(response.data)) {
      console.error('Unexpected response format:', response.data);
      return [];
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    console.error('Error details:', error.response?.data || error);
    return [];
  }
};

export const addCategory = async (categoryName, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/categories`,
      { name: categoryName },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding category:', error.message);
    throw error;
  }
};