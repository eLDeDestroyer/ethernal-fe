import axios from 'axios';

const API_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 'https://fcvhrvhnlunssvyegxar.supabase.co/functions/v1/';
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export default {
    async getTopics(categoryId) {
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.get(`${API_URL}get_topics_function`, {
                params: {
                    category_id: categoryId
                },
                headers: {
                    'apikey': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching topics:', error);
            throw error;
        }
    },

    async getHistoryTopics(categoryId) {
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.get(`${API_URL}get_history_user_function`, {
                params: {
                    category_id: categoryId
                },
                headers: {
                    'apikey': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching history topics:', error);
            throw error;
        }
    },

    async getHistoryUserAnswers(topicUuid) {
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.get(`${API_URL}get_history_user_answer_function`, {
                params: {
                    topic_uuid: topicUuid
                },
                headers: {
                    'apikey': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching history user answers:', error);
            throw error;
        }
    },

    async startQuestion(topicId) {
        const token = localStorage.getItem('access_token');

        try {
            const response = await axios.post(`${API_URL}start_question_function`, {
                topic_id: topicId
            }, {
                headers: {
                    'apikey': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error starting question:', error);
            throw error;
        }
    }
};
