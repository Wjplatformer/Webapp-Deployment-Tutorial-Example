import axios from 'axios'
import { ACCES_TOKEN  } from './constants'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL //spefifies url to work with
})

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