// async function getData(){
//     console.log('Making an api call');
//     const data = await axios.get('https://swapi.dev/api/planets');
//     console.log(data);
//     console.log('After the api call');
//     console.log('Making the next call');
//     const data1 = await axios.get(data.data.nextj);
//     console.log(data1);
//     console.log('Call ended');
// }

// getData().catch((err) =>{
//     console.log('In Catch');
//     console.log(err);
// });

//Difference b/w Sequential and parallel request

//Sequential Request
// async function get3Pokemon(){
//     const poke1 = await axios.get('https://pokeapi.co/api/v2/pokemon/1');
//     const poke2 = await axios.get('https://pokeapi.co/api/v2/pokemon/2');
//     const poke3 = await axios.get('https://pokeapi.co/api/v2/pokemon/3');
//     console.log(poke1.data.name);
//     console.log(poke2.data.name);
//     console.log(poke3.data.name);
// }

//Parallel request
// async function get3Pokemon(){
//     const prom1 = axios.get('https://pokeapi.co/api/v2/pokemon/1');
//     const prom2 = axios.get('https://pokeapi.co/api/v2/pokemon/2');
//     const prom3 = axios.get('https://pokeapi.co/api/v2/pokemon/3');

//     const poke1 = await prom1;
//     const poke2 = await prom2;
//     const poke3 = await prom3;

//     console.log(poke1.data.name);
//     console.log(poke2.data.name);
//     console.log(poke3.data.name);
// // }

// get3Pokemon();

//Example2 Sequential v/s Parallel request

function changeBackgroundColor(color, delay){
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            document.body.style.backgroundColor = color;
            resolve();
        }, delay)
    })
}

//Sequential requests
// async function lightShow(){
//     await changeBackgroundColor('blue', 1000);
//     await changeBackgroundColor('red', 1000);
//     await changeBackgroundColor('violet', 1000);
//     await changeBackgroundColor('indigo', 1000);
// }

//Parallel Requests
// async function lightShow(){
//     const p1 = changeBackgroundColor('blue', 1000);
//     const p2 = changeBackgroundColor('red', 1000);
//     const p3 = changeBackgroundColor('violet', 1000);
//     const p4 = changeBackgroundColor('indigo', 1000);

//     await p1;
//     await p2;
//     await p3;
//     await p4;
// }

// lightShow();

//Using Promise.all() which takes in an array of promises

async function get3Pokemon(){
    const p1 = axios.get('https://pokeapi.co/api/v2/pokemon/1');
    const p2 = axios.get('https://pokeapi.co/api/v2/pokemon/2');
    const p3 = axios.get('https://pokeapi.co/api/v2/pokemon/3');

    const results = await Promise.all([p1, p2, p3]);

    console.log(results);

    results.forEach(result =>{
        console.log(result.data.name);
    })
}

get3Pokemon();