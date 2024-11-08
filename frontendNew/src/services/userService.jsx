import axios from 'axios';

const API_URL ="";

export const getUserProfile = async () => {
    return axios.get(`${API_URL}/user/profile`);
};
