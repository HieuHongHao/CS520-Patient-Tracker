import axios from 'axios';

import { BACKEND_URL } from '../config';

const API_URL = `${BACKEND_URL}/api/user`; // Replace with your actual API URL

export const loginUser = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const registerUser = async ({ email, password, role, ...data }) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { email, password, role, ...data });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
