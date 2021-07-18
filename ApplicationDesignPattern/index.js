const apiKey = 'YourApiKey';
const autoCompleteConfig = {
  renderOptions(movie) {
    const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

    return `
            <img src = '${imgSrc}' />
            ${movie.Title}
          `;
  },

  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie);
  },

  inputValue(movie) {
    return movie.Title;
  },

  async fetchData(searchTerm) {
    const response = await axios.get('http://www.omdbapi.com', {
      params: {
        apikey: apiKey,
        s: searchTerm,
      },
    });

    if (response.data.Error) return [];
    return response.data.Search;
  },
};

let leftMovie, rightMovie;

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
});

createAutoComplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-autocomplete'),
  onOptionSelect(movie) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
});

const onMovieSelect = async (movie, summaryElem, side) => {
  const response = await axios.get('http://www.omdbapi.com', {
    params: {
      apikey: apiKey,
      i: movie.imdbID,
    },
  });
  //   console.log(response.data);
  summaryElem.innerHTML = movieTemplate(response.data);

  if (side == 'left') {
    leftMovie = response.data;
  } else {
    rightMovie = response.data;
  }

  if (leftMovie && rightMovie) {
    runComparisons();
  }
};

const runComparisons = () => {
  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );

  leftSideStats.forEach((leftStat, idx) => {
    const rightStat = rightSideStats[idx];

    const leftStatValue = parseInt(leftStat.dataset.value);
    const rightStatValue = parseInt(rightStat.dataset.value);

    if (leftStatValue > rightStatValue) {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    } else {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    }
  });
};

const movieTemplate = (movieDetail) => {
  const title = movieDetail.Title ? movieDetail.Title : '';
  const genre = movieDetail.Genre ? movieDetail.Genre : '';
  const plot = movieDetail.Plot ? movieDetail.Plot : '';

  const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);

    if (isNaN(value)) {
      return prev;
    }
    return prev + value;
  }, 0);

  const dollars = parseInt(
    movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')
  );

  const metaScore = parseInt(movieDetail.MetaScore);

  const imdbRating = parseFloat(movieDetail.imdbRating);

  const imdbVotes = parseInt(movieDetail.imdbVotes.replace('/,/g', ''));

  return `
        <article class = 'media'>
           <figure class = 'media-left'>
            <p class = 'image'>
                <img src = '${movieDetail.Poster}' />
            </p>
           </figure> 

           <div class='media-content'>
            <div class = 'content'>
                <h1>${title}</h1>
                <h4>${genre}</h4>
                <p>${plot}</p>
            </div>
           </div>
        </article>

        <article data-value = ${awards} class= 'notification is-primary>
            <p class = 'title'>${movieDetail.Awards}</p>
            <p class = 'subtitle'>Awards</p>
        </article>

        <article data-value = ${dollars} class= 'notification is-primary>
            <p class = 'title'>${movieDetail.BoxOffice}</p>
            <p class = 'subtitle'>Box Office</p>
        </article>

        <article data-value = ${metaScore} class= 'notification is-primary>
            <p class = 'title'>${
              movieDetail.MetaScore ? movieDetail.MetaScore : 'Unavailable'
            }</p>
            <p class = 'subtitle'>Metascore</p>
        </article>

        <article data-value = ${imdbRating} class= 'notification is-primary>
            <p class = 'title'>${movieDetail.imdbRating}</p>
            <p class = 'subtitle'>IMDB Rating</p>
        </article>

        <article data-value = ${imdbVotes} class= 'notification is-primary>
            <p class = 'title'>${movieDetail.imdbVotes}</p>
            <p class = 'subtitle'>IMDB Votes</p>
        </article>
    `;
};
