import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3003/api',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export default axiosInstance;
