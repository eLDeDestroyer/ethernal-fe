import axios from 'axios';

const API_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 'https://ikmwtjtmcjflrszxaeud.supabase.co/functions/v1/';
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default {
    async getDashboardData() {
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.get(`${API_URL}get_dashboard_function`, {
                headers: {
                    'apikey': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    }
};
