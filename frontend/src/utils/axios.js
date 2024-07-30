import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000';

export const csrf = () => axios.get('/sanctum/csrf-cookie');

export default axios;