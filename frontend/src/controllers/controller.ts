import axios from 'axios';
import { Duty } from '../../../backend/src/types/Duty';

const API_URL = 'http://localhost:8080';

export const getDuties = async (): Promise<Duty[]> => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const createDuty = async (duty: Partial<Duty>): Promise<Duty> => {
  const response = await axios.post(`${API_URL}`, duty);
  return response.data;
};

export const updateDuty = async (duty: Duty): Promise<Duty> => {
  const response = await axios.put(`${API_URL}/${duty.id}`, duty);
  return response.data;
};

export const deleteDuty = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};