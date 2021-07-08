import {useContext} from 'react';
import { MovieContext } from './MovieContext';

const Nav = () => {
    const [movies, setMovies] = useContext(MovieContext);
  return (
    <nav>
        <ul className="nav-links">
            <li>Logo</li>
            <li>No. of movies: {movies.length}</li>
        </ul>
    </nav>
  );
};

export default Nav;
