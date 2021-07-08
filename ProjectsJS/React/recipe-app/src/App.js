import logo from './logo.svg';
import { useState, useEffect } from 'react';
import Reciepe from './Components/Reciepe';

import './App.css';

function App() {
  const app_id = process.env.React_App_APIId;
  const app_key = process.env.React_App_APIKey;

  const [search, setsearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const [reciepes, setReciepes] = useState([]);
  useEffect(() => {
    getReciepe();
  }, [setQuery]);

  const getReciepe = async () => {
    const reqUrl = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`;

    // console.log(reqUrl);
    let res = await fetch(reqUrl);
    let response = await res.json();
    // console.log(response);

    setReciepes(response.hits);
  };

  const onSearchInput = (e) => {
    setsearch(e.target.value);
  };

  const onSearchClick = (e) => {
    e.preventDefault();
    setQuery(search);
  };
  return (
    <div className="App">
      <h1>Food Reciepe search</h1>
      <form onSubmit={onSearchClick} className="search-form">
        <input
          type="text"
          name=""
          id="searchBar"
          value={search}
          onChange={onSearchInput}
          className="search-bar"
        />{' '}
        &nbsp;
        <button id="searchBtn" onClick={getReciepe} className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {reciepes.map((reciepItm) => (
          <Reciepe
            key={reciepItm.recipe.label + Math.floor(Math.random() * 100)}
            title={reciepItm.recipe.label}
            calorie={reciepItm.recipe.calories}
            image={reciepItm.recipe.image}
            ingredients={reciepItm.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
