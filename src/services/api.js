import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't tried to refresh yet
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                // Import dynamically to avoid circular dependency issues if any
                const { default: authService } = await import('./auth.service');
                const response = await authService.refreshToken(refreshToken);

                if (response.data.status) {
                    const { access_token, refresh_token } = response.data.data;

                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);

                    api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
                    originalRequest.headers['Authorization'] = `Bearer ${access_token}`;

                    return api(originalRequest);
                }
            } catch (refreshError) {
                // If refresh fails, clear tokens and redirect to login
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
