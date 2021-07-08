import { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = (props) => {
  const [movies, setMovies] = useState([
    {
      name: 'Harry Potter',
      price: 20,
      id: 1,
    },
    {
      name: 'Dark Knight',
      price: 20,
      id: 2,
    },
    {
      name: 'Kites',
      price: 20,
      id: 3,
    },
  ]);

  return (
    <MovieContext.Provider value={[movies, setMovies]}>
      {props.children}
    </MovieContext.Provider>
  );
};
