import axios from 'axios';

const API_URL = "http://localhost:5000";

export const fetchLessons = async () => {
    return axios.get(`${API_URL}/lessons`);
};
