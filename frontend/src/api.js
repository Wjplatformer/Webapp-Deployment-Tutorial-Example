import axios from 'axios'
import { ACCES_TOKEN  } from './constants'

const apiUrl = '/choreo-apis/django-react-tutorial/backend/v1'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl, //spefifies url to work with
});

api.interceptors.request.use( //Access token from backend and frontend etc
    (config) => {
        const token = localStorage.getItem(ACCES_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api