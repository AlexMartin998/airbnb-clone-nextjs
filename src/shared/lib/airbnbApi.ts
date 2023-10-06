import axios from 'axios';

export const airbnbApi = axios.create({ baseURL: '/api' }); // <- same domain  < next
