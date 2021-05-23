// fetch('https://swapi.dev/api/people/1').then(response =>{
//     // console.log(response)

//     return response.json();
// })
// .then(data =>{
//     return fetch(data.films[0]);
// })
// .then(response =>{
//     return response.json();
// })
// .then(data =>{
//     console.log(data);
// })

const printPlanetNames = (data) =>{
    console.log(data);
    console.log('Printing 10 planet names');

    data.results.forEach(planet =>{
        console.log(planet.name);
    });

    return Promise.resolve(data.next);
}

const fetchNextPlanets = url =>{
    return fetch(url);
}

fetch('https://swapi.dev/api/planets')
.then(getResponse)
.then(printPlanetNames)
.then(fetchNextPlanets)
.then(getResponse)
.then(printPlanetNames)
.catch(err =>{
    console.log('SOMETHING WENT WRONG  '+err);
});

function getResponse(response){
    if(!response.ok){
        throw new Error(`Status code error :${response.status}`);
    }

    return response.json();
};

