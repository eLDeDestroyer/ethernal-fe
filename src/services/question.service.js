import axios from 'axios';

const API_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 'https://fcvhrvhnlunssvyegxar.supabase.co/functions/v1/';
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default {
    async getQuestions(topicId) {
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.get(`${API_URL}get_question_function`, {
                params: {
                    topic_id: topicId
                },
                headers: {
                    'apikey': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching questions:', error);
            throw error;
        }
    },
    async submitAnswers(payload) {
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.post(`${API_URL}end_question_function`, payload, {
                headers: {
                    'apikey': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error submitting answers:', error);
            throw error;
        }
    },

    async getAnswers(queryResultId) {
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.get(`${API_URL}get_answer_function`, {
                params: {
                    query_result_id: queryResultId
                },
                headers: {
                    'apikey': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching answers:', error);
            throw error;
        }
    }
};
