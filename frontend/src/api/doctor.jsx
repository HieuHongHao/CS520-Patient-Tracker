import { api } from './util';

const API_URL = `/api/doctor`; // Replace with your actual API URL

export const getDoctor = async ({ doctorId }) => {
  try {
    const response = await api.get(`${API_URL}/${doctorId}`);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};