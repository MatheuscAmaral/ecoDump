import axios from 'axios'

const api = axios.create({
  baseURL: 'https://eco-dump-api.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;