import { api } from './util';

const API_URL = `/api/doctor`;

export const updateDoctor = async (id, data) => {
  try {
    const response = await api.put(`${API_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getDoctorAppointments = async (doctorID) => {
  try {
    const response = await api.get(`${API_URL}/${doctorID}/appointments`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error.response;
  }
}
