//https://www.themoviedb.org/3/movie/550?api_key=057eb33b4af7c84b07e838484bbf482c

// https://api.themoviedb.org/3/movie/550?api_key=57b4025ea3b2beb4d12b65e71d4dc270

fetch(
  "https://api.themoviedb.org/3/movie/550?api_key=57b4025ea3b2beb4d12b65e71d4dc270"
)
  .then((response) => response.json())
  .then((data) => console.log(data));

const movies = [
  {
    id: 1,
    title: "Titanic",
    thumb:
      "https://cdn.cinematerial.com/p/297x/m5ieu5ug/titanic-ii-dvd-movie-cover-md.jpg",
  },
  {
    id: 2,
    title: "Szklana Pułapka",
    thumb: "https://fwcdn.pl/fpo/12/70/1270/7382745.3.jpg",
  },
];

const titleElement = document.querySelector(".title-input");
const movieList = document.querySelector(".movie-list");

function render() {
  movies.forEach((movie) => {
    // empty boxes
    const movieElement = document.createElement("div");
    const movieIdElement = document.createElement("h1");
    const movieTitleElement = document.createElement("div");
    const movieThumbElement = document.createElement("img");

    // taking value
    movieIdElement.textContent = movie.id;
    movieTitleElement.textContent = movie.title;
    movieThumbElement.src = movie.thumb;

    // adding classes
    movieTitleElement.classList.add("movie-title");

    // adding elements
    movieList.appendChild(movieElement);
    movieElement.appendChild(movieIdElement);
    movieElement.appendChild(movieTitleElement);
    movieElement.appendChild(movieThumbElement);
  });
}

render();
