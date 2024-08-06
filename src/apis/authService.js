import instance from './axios';

export function checkLogin() {
    try {
        const token = localStorage.getItem('access_token') || '';
        if (!token) {
            return false;
        }

        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        const payload = JSON.parse(jsonPayload);
    
        const currentTime = Math.floor(Date.now() / 1000);
        return payload.exp > currentTime;
    } catch (e) {
        console.error('Invalid token', e);
        return false;
    }
}

export async function login(username, password) {
    try {
        const response = await instance.post("/authorize", {
            username, password
        });
        return response.data.data;
    } catch (error) {
        alert("로그인 에러: " + (error instanceof Error ? error.message : error));
    }
}

export async function signup(name, email, age, height, weight, gender, activity, password) {
    try {
        const response = await instance.post("/users", {
            name, email, age, height, weight, gender, activity, password
        });
        response.data;
    } catch (error) {
        alert("로그인 에러: " + (error instanceof Error ? error.message : error));
    }
}

export async function getUserInfo() {
    try {
        const response = await instance.get("/users");
        return response.data
    } catch (error) {
        alert('유저 정보 조회 에러: ' + (error instanceof Error ? error.message : error));
    }
}

