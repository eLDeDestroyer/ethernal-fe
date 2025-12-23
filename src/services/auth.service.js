import api from './api';
import axios from 'axios';

const API_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 'https://ikmwtjtmcjflrszxaeud.supabase.co/functions/v1/';

export default {
    login(credentials) {
        return axios.post(`${API_URL}login_function`, credentials);
    },
    register(userData) {
        return axios.post(`${API_URL}register_function`, userData);
    },
    refreshToken(token) {
        return axios.post(`${API_URL}refresh_token_function`, { refresh_token: token });
    },
    getUser() {
        return api.get('/auth/user');
    },
};
