import {useState} from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { ACCES_TOKEN, REFRESH_TOKEN } from '../constants';
import '../styles/Form.css';
import LoadingIndicator from './LoadingIndicator';

function Form({route, method}) { //route tells which route to go to either login or register, method is the same
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading,  setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === 'login' ? 'Login':'Register';

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password})
            if (method === 'login') {
                localStorage.setItem(ACCES_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/') //navigate to home to view notes
            } else {
                navigate('/login')
            }

        } catch (error) {
            alert("make sure yo credentials valid bruh");
        } finally {
            setLoading(false);
        }
    };

    return (
     <form onSubmit={handleSubmit} className='form-container'>
        <h1>{name}</h1>
        <input
            className='form-input'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Yo crib name'
        />
        <input
            className='form-input'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password here boi'
        />
        {loading && <LoadingIndicator />}
        <button className='form-button' type='submit'>
            {name}
        </button>
    </form>
    )
}

export default Form