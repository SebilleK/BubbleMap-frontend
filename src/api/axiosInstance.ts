import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://bubblemap.onrender.com/api',
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
});

export default axiosInstance;
