const API_KEY = "57b4025ea3b2beb4d12b65e71d4dc270";

const titleElement = document.querySelector(".title-input");
const movieList = document.querySelector(".movie-list");
const searchInputElement = document.querySelector(".nav__search--input");
const getPopularBtn = document.querySelector(".get-popular-btn");
const searchBtn = document.querySelector(".search-btn");
const navBar = document.querySelector(".nav");
const modalDescription = document.querySelector(".modal-description");
const sortAzBtn = document.querySelector(".sort-az");
const sortZaBtn = document.querySelector(".sort-za");
const sortByVoteBtn = document.querySelector(".sort-by-vote");

let state = {
  movies: [],
  movieDetails: null,
  ready: false,
  modalOpened: false,
  page: 1,
  onePageLoading: 0,
  sort: 0,
  totalPages: 1,
};

let options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      handleNext();
      observer.unobserve(entry.target);
    }
  });
}, options);

getPopularBtn.addEventListener("click", fetchPopularMovies);

searchInputElement.addEventListener(
  "keyup",
  debounce(() => {
    // widok z logika!
    movieList.innerHTML = "";
    state.page = 1;
    state.onePageLoading = 1;
    fetchByQuery();
  }, 1000)
);

function handleNext() {
  state.page++;
  fetchByQuery();
}

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

function fetchPopularMovies() {
  state.onePageLoading = 0;
  searchInputElement.value = "";
  getMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
}

function fetchByQuery() {
  const searchInput = searchInputElement.value;
  if (searchInput.length >= 3 && state.totalPages >= state.page) {
    getMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput}&page=${state.page}`
    );
  }
}

function fetchDetails(id) {
  fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`).then(
    (res) => {
      res.json().then((data) => {
        state.movieDetails = data;
        openModal();
      });
    }
  );
}

async function getMovies(link) {
  const res = await fetch(link);
  const json = await res.json();
  let movies = json.results;
  state.movies = movies;
  state.ready = true;
  state.totalPages = json.total_pages;
  render();
}

sortAzBtn.addEventListener("click", sortMoviesAz);
sortZaBtn.addEventListener("click", sortMoviesZa);
sortByVoteBtn.addEventListener("click", sortByVote);

function sortMoviesAz() {
  state.sort = 1;
  let sortedMovies = state.movies;
  sortedMovies.sort(function (a, b) {
    if (a.title > b.title) {
      return 1;
    }
    return -1;
  });
  console.log(sortedMovies);
  render();
  state.sort = 0;
}
function sortMoviesZa() {
  state.sort = 1;
  let sortedMovies = state.movies;
  sortedMovies.sort(function (a, b) {
    if (a.title < b.title) {
      return 1;
    }
    return -1;
  });
  render();
  state.sort = 0;
}

function sortByVote() {
  state.sort = 1;
  let sortedMovies = state.movies;
  sortedMovies.sort(function (a, b) {
    if (a.vote_average < b.vote_average) {
      return 1;
    }
    return -1;
  });
  render();
  state.sort = 0;
}

function handleMovieClick(id) {
  if (state.modalOpened === true) {
    return;
  }
  fetchDetails(id);
}

function render() {
  if (state.onePageLoading === 0 || state.sort === 1) {
    movieList.innerHTML = "";
  }

  if (state.sort === 1 && state.movies.length === 0) {
    return;
  }

  if (state.ready === false) {
    const loadingIndicatorElement = document.createElement("p");
    loadingIndicatorElement.textContent = "LOADING...";
    loadingIndicatorElement.classList.add("loadingIndicatorElement");
    movieList.append(loadingIndicatorElement);
    return;
  }

  state.movies.forEach((movie, index) => {
    // empty boxes
    const movieElement = document.createElement("div");
    const movieVoteElement = document.createElement("h1");
    const movieTitleElement = document.createElement("p");
    const movieThumbElement = document.createElement("img");

    // taking value
    movieVoteElement.textContent = movie.vote_average;
    movieTitleElement.textContent = movie.title;

    if (movie.poster_path === null) {
      movieThumbElement.src = "assets/images/empty_poster.jpeg";
    } else {
      movieThumbElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    }

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

    if (state.onePageLoading === 1 && index === state.movies.length - 1) {
      observer.observe(movieElement);
    }
  });
}
