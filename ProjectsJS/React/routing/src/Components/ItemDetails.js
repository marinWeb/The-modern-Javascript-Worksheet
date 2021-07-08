import { useState, useEffect } from "react";
const ItemDetails = (prop) =>{
    
    const [item, setItem] = useState({});

    useEffect(() =>{
        console.log(prop);
        fetchItem();
    }, []);

    const fetchItem = async () =>{
        // const itemid = '0ed3ec7-0079b7c-1276584-8dbc4ad';
        const item = await fetch(`https://swapi.dev/api/films/1/`);
        const dataItem = await item.json();
        console.log(dataItem);
    };
    return(
        <div>
            <h1>Items</h1>
        </div>
    )
};

export default ItemDetails;