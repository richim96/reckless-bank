import axios from 'axios';
import { Account } from './types';


const API_BASE_URL = 'http://localhost:9000';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// API functions
export const createAccount = async (name: string) => {
  const response = await api.post<Account>('/account/create', { name: name });
  return response.data;
};

export const loginAccount = async (name: string) => {
  const response = await api.post<Account>('/account/login', { name: name });
  return response.data;
};

export const depositAmount = async (name: string, amount: number) => {
  const response = await api.post<Account>('/account/deposit', { name, amount });
  return response.data;
};

export const withdrawAmount = async (name: string, amount: number) => {
  const response = await api.post<Account>('/account/withdraw', { name, amount });
  return response.data;
};

export const transferAmount = async (sender: string, amount: number, recipient: string) => {
  const response = await api.post<Account[]>('/account/transfer', { sender, amount, recipient });
  return response.data;
};