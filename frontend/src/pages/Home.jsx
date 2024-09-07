import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Note from '../components/Note'
import '../styles/Home.css'

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getNotes();
        getUsers();
    }, [])

    const getNotes = () => {
        api
            .get('/api/notes/')
            .then((res) => res.data)
            .then((data) => {setNotes(data); console.log(data)})
            .catch((err) => alert(err));
            const notelog = notes.map((note) => note)
            console.log(notelog)
    };

    const getUsers = () => {
        api
            .get('/api/user/')
            .then((res) => res.data)
            .then((data) => {setUser(data[0]['id']);}) //sets user const to be the id of the user
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert('Note Gone ma boi!');
                else alert("My bad bro can't delete 'em");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const deleteUser = (id) => {
        console.log(id)
        api
            .delete(`/api/user/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert('You Gone ma boi!');
                else alert("My bad bro can't remove you from da vehicle");
                navigate('/login');
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault()
        api
            .post('/api/notes/', {content, title})
            .then((res) => {
                if (res.status === 201) alert('Note in PUTTED my man!');
                else alert("My bad bro can't birth 'em");
                getNotes();
            })
            .catch((err) => alert(err));
    };

    return(
        <div>
            <div>
                <h2>Ideas</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note}/>
                ))}

            </div>
            <h2>Create Big Ideas</h2>
            <form onSubmit={createNote}>
                <label htmlFor='title'>The Idea:</label>
                <br/>
                <input
                    type='text' 
                    id='title' 
                    name='title' 
                    required 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor='content'>The Detail:</label>
                <br/>
                <textarea 
                    id='content' 
                    name='content' 
                    required 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br/>   
                <input type='submit' value='Submit'></input>
            </form>
            <button className='delete-button' onClick={() => deleteUser(user)} > 
                DELETE ACCOUNT 
            </button> 
        </div>
  );
}

export default Home