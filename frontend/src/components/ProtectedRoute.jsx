import {Navigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api';
import { REFRESH_TOKEN, ACCES_TOKEN } from '../constants';
import { useState, useEffect } from 'react';

//This is an example of an insecure frontend protection for authorization

function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    })

    const refreshToken = async() => { //sends to backend to refresh
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            const res = await api.post('/api/token/refresh/', {
                refresh: refreshToken
            });
            if (res.status === 200) {
                localStorage.setItem(ACCES_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false)
        }
    };

    const auth = async() => { //checks if token is valid
        const token = localStorage.getItem(ACCES_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const now = Date.now() / 1000 //gets token in seconds

        if (tokenExpiration < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to='/login' />
}

export default ProtectedRoute