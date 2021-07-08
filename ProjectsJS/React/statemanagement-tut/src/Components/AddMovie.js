import {useState, useContext} from 'react';
import { MovieContext } from './MovieContext';
const AddMovie = () =>{

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [movies, setMovies] = useContext(MovieContext);

    const updateName = e =>{
        setName(e.target.value);
    }

    const updatePrice = e =>{
        setPrice(e.target.value);
    }

    const submitMovie = (e) =>{
        e.preventDefault();
        console.log('attempting to submit movie');
        setMovies(prevMovies => [...prevMovies, {name:name, price: price, key:Math.floor(Math.random() * 1000)}]);
        console.log(movies);
    }

    return(
        <form onSubmit={submitMovie}>
            <input type="text"  value={name} onChange={updateName}/>
            <input type="text" value={price} onChange = {updatePrice} />
            <button>Submit</button>
        </form>
    )
}

export default AddMovie;