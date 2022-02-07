const API_KEY = "57b4025ea3b2beb4d12b65e71d4dc270";

const titleElement = document.querySelector(".title-input");
const movieList = document.querySelector(".movie-list");
const searchInputElement = document.querySelector(".nav__search--input");
const searchBtn = document.querySelector(".search-btn");

const modalDescription = document.querySelector(".modal-description");

let state = {
  movies: [],
  movieDetails: null,
  ready: false,
  modalOpened: false,
};

////////////////////////////////////////////////////////////////
// dynamic searching before debouncing

// searchInputElement.addEventListener("keyup", () => {
//   searchDuringWrite();
// });

const debounce = (fn, delay) => {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

function searchDuringWrite() {
  const searchInput = searchInputElement.value;
  if (searchInput.length >= 3) {
    fetchByQuery();
  }
}
////////////////////////////////////////////////////////////////

searchInputElement.addEventListener(
  "keyup",
  debounce(() => {
    searchDuringWrite();
  }, 1000)
);

////////////////////////////////////////////////////////////////

function fetchPopularMovies() {
  getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
}

function fetchByQuery() {
  const searchInput = searchInputElement.value;
  getMovies(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput}`
  );
}

function fetchDetails(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      state.movieDetails = data;
      openModal();
    });
}

function getMovies(link) {
  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      let movies = data.results;
      console.log(movies);
      state.movies = movies;
      state.ready = true;
      render();
    });
}

function render() {
  movieList.innerHTML = "";
  if (state.ready === false) {
    const loadingIndicatorElement = document.createElement("p");
    loadingIndicatorElement.textContent = "LOADING...";
    loadingIndicatorElement.classList.add("loadingIndicatorElement");
    movieList.append(loadingIndicatorElement);
    return;
  }

  state.movies.forEach((movie) => {
    // empty boxes
    const movieElement = document.createElement("div");
    const movieVoteElement = document.createElement("h1");
    const movieTitleElement = document.createElement("p");
    const movieThumbElement = document.createElement("img");

    // taking value
    movieVoteElement.textContent = movie.vote_average;
    movieTitleElement.textContent = movie.title;
    movieThumbElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    // adding classes
    movieElement.classList.add("movie-element");
    movieVoteElement.classList.add("movie-vote");
    movieTitleElement.classList.add("movie-title");
    movieThumbElement.classList.add("movie-poster");

    // adding elements
    movieList.appendChild(movieElement);
    movieElement.appendChild(movieVoteElement);
    movieElement.appendChild(movieTitleElement);
    movieElement.appendChild(movieThumbElement);

    movieElement.addEventListener("click", () => handleMovieClick(movie.id));
  });
}

function handleMovieClick(id) {
  fetchDetails(id);
}
