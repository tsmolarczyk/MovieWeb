// https://api.themoviedb.org/3/movie/550?api_key=57b4025ea3b2beb4d12b65e71d4dc270

const API_KEY = "57b4025ea3b2beb4d12b65e71d4dc270";

const titleElement = document.querySelector(".title-input");
const movieList = document.querySelector(".movie-list");
const searchInputElement = document.querySelector(".nav__search--input");

const movieDetails = document.querySelector(".movie-details");

let state = {
  movies: [],
  ready: 0,
};

function fetchPopularMovies() {
  getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
}

function fetchByQuery() {
  const searchInput = searchInputElement.value;
  getMovies(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput}`
  );
}

function getMovies(link) {
  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      let movies = data.results;
      console.log(movies);
      state.movies = movies;
      state.ready = 1;
      render();
    });
}

function render() {
  movieList.innerHTML = "";
  if (state.ready === 0) {
    const loadingIndicatorElement = document.createElement("p");
    loadingIndicatorElement.textContent = "LOADING...";
    loadingIndicatorElement.classList.add("loadingIndicatorElement");
    movieList.append(loadingIndicatorElement);
    return;
  }

  state.movies.forEach((movie) => {
    // empty boxes
    const movieElement = document.createElement("div");
    const movieIdElement = document.createElement("h1");
    const movieTitleElement = document.createElement("p");
    const movieThumbElement = document.createElement("img");

    // taking value
    movieIdElement.textContent = movie.id;
    movieTitleElement.textContent = movie.title;
    movieThumbElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

    // adding classes
    movieElement.classList.add("movie-element");
    movieIdElement.classList.add("movie-id");
    movieTitleElement.classList.add("movie-title");
    movieThumbElement.classList.add("movie-poster");

    // adding elements
    movieList.appendChild(movieElement);
    movieElement.appendChild(movieIdElement);
    movieElement.appendChild(movieTitleElement);
    movieElement.appendChild(movieThumbElement);
  });
}

function showDetails() {
  // const movieDetails = document.querySelector(".movie-details");

  // movieList.style.display = "none";

  state.movies.forEach((movie) => {
    const movieDescription = document.createElement("div");
    const movieOverview = document.createElement("p");

    movieDetails.appendChild(movieDescription);
    movieDescription.appendChild(movieOverview);

    movieOverview.textContent = movie.overview;
  });
}
