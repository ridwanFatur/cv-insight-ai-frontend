import axios, { type InternalAxiosRequestConfig } from 'axios'
import { getCookie } from './cookie-helper';

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_BACKEND_API_URL ?? 'http://localhost:8000',
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
	paramsSerializer: (params) =>
		Object.entries(params)
			.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
			.join('&'),
})

axiosClient.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		try {
			const token = getCookie('token');
			if (token) {
				config.headers = config.headers ?? {};
				config.headers['Authorization'] = `Bearer ${token}`;
			}
			return config;
		} catch (err) {
			return Promise.reject(err);
		}
	},
	(error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error);
	}
);
export default axiosClient