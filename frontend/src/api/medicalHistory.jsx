import { api } from './util';

const API_URL = `/api/medicalHistory`; // Replace with your actual API URL

export const addMedicalHistory = async({patientId, condition, description, visitedDate}) => {
    try {
      const response = await api.post(`${API_URL}`, {
        patientId, condition, description, visitedDate
      });
      console.log(response.data);
      return response.data;    
    } catch (error) {
      throw error.response;
    }
}
  