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

let state = {
  movies: [],
  movieDetails: null,
  ready: false,
  modalOpened: false,
  page: 1,
  onePageLoading: 0,
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

function getMovies(link) {
  fetch(link)
    .then((res) => res.json())
    .then((data) => {
      let movies = data.results;
      state.movies = movies;
      state.ready = true;
      state.totalPages = data.total_pages;
      render();
    });
}

sortAzBtn.addEventListener("click", sortMoviesAz);
// sortZaBtn.addEventListener("click", sortMoviesZa);

function sortMoviesAz() {
  const foo = [{ id: 1 }, { id: 4 }, { id: 3 }];
  foo.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    return -1;

    // return -1 lub 1
  });
  console.log(foo);
}

function handleMovieClick(id) {
  if (state.modalOpened === true) {
    return;
  }
  fetchDetails(id);
}

function render() {
  if (state.onePageLoading === 0) {
    movieList.innerHTML = "";
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
