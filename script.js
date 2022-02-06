// https://api.themoviedb.org/3/movie/550?api_key=57b4025ea3b2beb4d12b65e71d4dc270

const API_KEY = "57b4025ea3b2beb4d12b65e71d4dc270";

const titleElement = document.querySelector(".title-input");
const movieList = document.querySelector(".movie-list");
const searchInputElement = document.querySelector(".nav__search--input");

const modalDescription = document.querySelector(".modal-description");

//Cczy w ty mmiejscu > z by byl dostep
const modalCloseBtn = document.createElement("button");

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
    const movieVoteElement = document.createElement("h1");
    const movieTitleElement = document.createElement("p");
    const movieThumbElement = document.createElement("img");
    const movieOverviewElement = document.createElement("p");

    // taking value
    movieVoteElement.textContent = movie.vote_average;
    movieTitleElement.textContent = movie.title;
    movieThumbElement.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    movieOverviewElement.textContent = movie.overview;

    // adding classes
    movieElement.classList.add("movie-element");
    movieVoteElement.classList.add("movie-vote");
    movieTitleElement.classList.add("movie-title");
    movieThumbElement.classList.add("movie-poster");
    movieOverviewElement.classList.add("movie-overview");

    // adding elements
    movieList.appendChild(movieElement);
    movieElement.appendChild(movieVoteElement);
    movieElement.appendChild(movieTitleElement);
    movieElement.appendChild(movieThumbElement);
    movieElement.appendChild(movieOverviewElement);
  });
}

// MODAL

movieList.addEventListener("click", function (e) {
  const title = e.target.querySelector(".movie-title").innerText;
  console.log(title);
  const overview = e.target.querySelector(".movie-overview").innerText;
  modalDescription.classList.contains("active")
    ? closeModal()
    : openModal(title, overview);
});

modalCloseBtn.addEventListener("click", (e) => {
  closeModal();
});

function openModal(title, overview) {
  if (modalDescription.classList.contains("active")) {
    return;
  }
  renderModal(title, overview);
  modalDescription.classList.add("active");
  movieList.classList.add("shadow");
}

function closeModal() {
  modalDescription.textContent = "";
  modalDescription.classList.remove("active");
  movieList.classList.remove("shadow");
}

function renderModal(title, overview) {
  const modalTitle = document.createElement("h3");
  const modalText = document.createElement("p");

  modalTitle.textContent = title;
  modalText.textContent = overview;

  modalCloseBtn.classList.add("close-btn");

  modalDescription.appendChild(modalTitle);
  modalDescription.appendChild(modalText);
  modalDescription.appendChild(modalCloseBtn);
}
