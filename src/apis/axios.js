import axios from 'axios';

const baseURL = process.env.VUE_APP_BASE_URL;

const instance = axios.create({
    baseURL: baseURL
});

function isJWT(token) {
    const parts = token.split('.');
    return parts.length === 3;
}

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token && isJWT(token)) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            const { status } = error.response;
            if (status === 401 || status === 403) {
                alert("로그인이 필요합니다");
                window.location = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default instance;