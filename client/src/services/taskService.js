import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/tasks';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

// Centralized error handling
const handleError = (error) => {
  console.error('API call failed:', error.response ? error.response.data : error.message);
  throw error.response ? error.response.data : new Error('Network error');
};

// Fetch all tasks
const getTasks = async () => {
  try {
    const response = await axiosInstance.get('/');
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Fetch a single task by ID
const getTaskById = async (id) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Create a new task
const createTask = async (taskData) => {
  try {
    const response = await axiosInstance.post('/', taskData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Update an existing task by ID
const updateTask = async (id, taskData) => {
  try {
    const response = await axiosInstance.put(`/${id}`, taskData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

// Delete a task by ID
const deleteTask = async (id) => {
  try {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
