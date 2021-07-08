import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Shop() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const getItems = await fetch('https://swapi.dev/api/films');
    const data = await getItems.json();
    console.log(data);
    setItems(data.results);
  };
  return (
    <div>
      {items.map((itm) => (
        <h1 key={itm.url.slice(-2, -1)}>
          <Link to={`/shop/${itm.url}`}>{itm.title}</Link>
          <p>{itm.url}</p>
        </h1>
      ))}
    </div>
  );
}

export default Shop;
