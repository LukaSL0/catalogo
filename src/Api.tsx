import axios, { AxiosInstance } from "axios";

const getToken = (): string | null => localStorage.getItem('_token');

const Api: AxiosInstance = axios.create({
    baseURL: "Censored",
});

Api.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
        config.headers["x-access-token"] = token;
    }
    return config;
});

export default Api;