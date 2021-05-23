const fetchPlanets = (url = 'https://swapi.dev/api/planets')=>{
    return axios.get(url);
}

const printPlanetNames = ({data}) =>{
    console.log('Printing Planets');

    data.results.forEach(planet =>{
        console.log(planet.name);
    });

    return Promise.resolve(data.next);
}

fetchPlanets()
.then(printPlanetNames)
.then(fetchPlanets)
.then(printPlanetNames)
.catch(err =>{
    console.log('Error : '+err)
})