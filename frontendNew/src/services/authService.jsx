import axios from 'axios';

const API_URL ="http://localhost:5000";

export const login = async (username, password) => {
    return await axios.post(`${API_URL}/api/auth/login`, { username, password });
};

export const register = async (userData) => {
    return await axios.post(`${API_URL}/api/auth/register`, userData);
};

export const logout = () => {
    localStorage.removeItem('user');
};
