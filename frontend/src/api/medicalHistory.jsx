import { api } from './util';

const API_URL = `/api/medicalHistory`;

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


export const getAllMedicalHistories = async() => {
    try {
      const response = await api.get(`${API_URL}`);
      console.log(response.data);
      return response.data;    
    } catch (error) {
      throw error.response;
    }
}
  