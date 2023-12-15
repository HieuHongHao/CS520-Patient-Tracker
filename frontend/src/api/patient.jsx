import { api } from './util';

const API_URL = `/api/patient`; // Replace with your actual API URL

export const checkAvailability = async ({ date, time, doctorId }) => {
  try {
    const response = await api.post(`${API_URL}/${doctorId}/check-availability`, { date, time });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const bookAppointment = async ({ date, time, reason, doctorId }) => {
  try {
    const response = await api.post(`${API_URL}/${doctorId}/book-appointment`, { date, time, reason });
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getPatientAppointments = async (patientId) => {
  try {
    const response = await api.get(`${API_URL}/${patientId}/appointments`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}