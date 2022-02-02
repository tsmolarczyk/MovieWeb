// https://api.themoviedb.org/3/movie/550?api_key=57b4025ea3b2beb4d12b65e71d4dc270

const API_KEY = "57b4025ea3b2beb4d12b65e71d4dc270";

const titleElement = document.querySelector(".title-input");
const movieList = document.querySelector(".movie-list");

function render() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      let movies = data.results;
      console.log(movies);

      movies.forEach((movie) => {
        // empty boxes
        const movieElement = document.createElement("div");
        const movieIdElement = document.createElement("h1");
        const movieTitleElement = document.createElement("div");
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
    });
}

function popular() {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      let movies = data.results;
      console.log(movies);

      movies.forEach((movie) => {
        // empty boxes
        const movieElement = document.createElement("div");
        const movieIdElement = document.createElement("h1");
        const movieTitleElement = document.createElement("div");
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
    });
}

function byKey() {
  const searchInput = document.querySelector(".nav__search--input").value;
  console.log(searchInput);

  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput}`
  )
    .then((res) => res.json())
    .then((data) => {
      let movies = data.results;
      console.log(movies);

      movies.forEach((movie) => {
        // empty boxes
        const movieElement = document.createElement("div");
        const movieIdElement = document.createElement("h1");
        const movieTitleElement = document.createElement("div");
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
    });
}

// // https://api.themoviedb.org/3/movie/550?api_key=57b4025ea3b2beb4d12b65e71d4dc270

// const API_KEY = "57b4025ea3b2beb4d12b65e71d4dc270";

// const moviewebdata = fetch(
//   `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
// )
//   .then((res) => res.json())
//   .then((data) => {
//     const moviesfetched = data;
//     console.log(moviesfetched.results);
//   });

// const movies = [
//   {
//     id: 1,
//     title: "Titanic",
//     thumb:
//       "https://cdn.cinematerial.com/p/297x/m5ieu5ug/titanic-ii-dvd-movie-cover-md.jpg",
//   },
//   {
//     id: 2,
//     title: "Szklana Pułapka",
//     thumb: "https://fwcdn.pl/fpo/12/70/1270/7382745.3.jpg",
//   },
//   {
//     id: 2,
//     title: "Szklana Pułapka",
//     thumb: "https://fwcdn.pl/fpo/12/70/1270/7382745.3.jpg",
//   },
//   {
//     id: 2,
//     title: "Szklana Pułapka",
//     thumb: "https://fwcdn.pl/fpo/12/70/1270/7382745.3.jpg",
//   },
//   {
//     id: 2,
//     title: "Szklana Pułapka",
//     thumb: "https://fwcdn.pl/fpo/12/70/1270/7382745.3.jpg",
//   },
//   {
//     id: 2,
//     title: "Szklana Pułapka",
//     thumb: "https://fwcdn.pl/fpo/12/70/1270/7382745.3.jpg",
//   },
//   {
//     id: 2,
//     title: "Szklana Pułapka",
//     thumb: "https://fwcdn.pl/fpo/12/70/1270/7382745.3.jpg",
//   },
// ];

// const titleElement = document.querySelector(".title-input");
// const movieList = document.querySelector(".movie-list");

// function render() {
//   movies.forEach((movie) => {
//     // empty boxes
//     const movieElement = document.createElement("div");
//     const movieIdElement = document.createElement("h1");
//     const movieTitleElement = document.createElement("div");
//     const movieThumbElement = document.createElement("img");

//     // taking value
//     movieIdElement.textContent = movie.id;
//     movieTitleElement.textContent = movie.title;
//     movieThumbElement.src = movie.thumb;

//     // adding classes
//     movieElement.classList.add("movie-element");
//     movieIdElement.classList.add("movie-id");
//     movieTitleElement.classList.add("movie-title");
//     movieThumbElement.classList.add("movie-poster");

//     // adding elements
//     movieList.appendChild(movieElement);
//     movieElement.appendChild(movieIdElement);
//     movieElement.appendChild(movieTitleElement);
//     movieElement.appendChild(movieThumbElement);
//   });
// }

// render();
