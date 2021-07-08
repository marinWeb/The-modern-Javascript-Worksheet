import logo from './logo.svg';
import './App.css';
import { MovieProvider } from './Components/MovieContext';
import Nav from './Components/Nav';
import AddMovie from './Components/AddMovie';
import MovieList from './Components/MoviesList';

function App() {
  return (
    <MovieProvider>
      <div className="App">
        <Nav />
        <AddMovie />
        <MovieList />
      </div>
    </MovieProvider>
  );
}

export default App;
