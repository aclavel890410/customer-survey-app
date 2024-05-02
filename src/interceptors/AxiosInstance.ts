import axios, { HeadersDefaults } from "axios";

const AxiosInstance = axios.create();


AxiosInstance.interceptors.request.use(
    config => {
        config.withCredentials = false
        config.headers['Content-Type'] = 'application/json; charset=utf-8'
        config.headers['Access-Control-Allow-Origin'] = '*'
        config.headers['Access-Control-Allow-Credentials'] = false;
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

export default AxiosInstance;