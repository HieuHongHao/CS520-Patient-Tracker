import { api } from './util';

const API_URL = `/api/user`; // Replace with your actual API URL

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const registerUser = async ({ email, password, role, ...data }) => {
  try {
    const response = await api.post(`${API_URL}/register`, { email, password, role, ...data });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

// We set token in HttpOnly cookie, only backend can delete, 
// this function invokes delete.
export const logoutUser = async () => {
  try {
    await api.post(`${API_URL}/logout`);
  } catch (error) {
    throw error.response;
  }
}