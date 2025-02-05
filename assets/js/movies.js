let moviesContainer = document.getElementById('movies');
let loadButton = document.getElementById('load');
let sortSelect = document.getElementById('sort');
let genreSelect = document.getElementById('genre');
let movies = [];
let filteredMovies = [];
let currentIndex = 0;

function displayMovies(movieList) {
  const moviesToShow = movieList.slice(currentIndex, currentIndex + 10);
  moviesContainer.innerHTML += moviesToShow.map(movie => `
    <div class="movies_box">
      <div class="suggestions_main_card_up">
        <span>HD</span>
      </div>
      <figure>
        <img src="${movie.image}" alt="${movie.title}" loading="lazy" />
      </figure>
      <div class="movie_text">
        <h3>${movie.title}</h3>
        <div class="main_text">
          <span>${movie.year}</span>
          <p>${movie.genre.join(', ')}</p>
        </div>
        <button onclick="viewDetails(${movie.id})"><i class="fa-solid fa-play"></i></button>
      </div>
    </div>
  `).join('');
}

function loadMovies() {
  displayMovies(filteredMovies);
  currentIndex += 10;
  if (currentIndex >= filteredMovies.length) {
    loadButton.style.display = 'none';
  }
}

function sortMovies() {
  const sortOption = sortSelect.value;
  filteredMovies.sort((a, b) => {
    switch (sortOption) {
      case 'a-z':
        return a.title.localeCompare(b.title);
      case 'z-a':
        return b.title.localeCompare(a.title);
      case 'imdb-asc':
        return a.rating - b.rating;
      case 'imdb-desc':
        return b.rating - a.rating;
      case 'year-asc':
        return a.year - b.year;
      case 'year-desc':
        return b.year - a.year;
      default:
        return 0;
    }
  });
  resetAndLoadMovies();
}

function filterMovies() {
  const selectedGenre = genreSelect.value;
  filteredMovies = selectedGenre === 'all'
    ? [...movies]
    : movies.filter(movie => movie.genre.includes(selectedGenre));
  resetAndLoadMovies();
}

function resetAndLoadMovies() {
  moviesContainer.innerHTML = '';
  currentIndex = 0;
  loadMovies();
}

function viewDetails(id) {
    const movie = movies.find(movie => movie.id === id);
    localStorage.setItem('selectedMovie', JSON.stringify(movie));
    window.location.href = 'detail.html'; 
  }

fetch('http://localhost:3000/mymovies')
  .then(response => response.json())
  .then(data => {
    movies = data;
    filteredMovies = [...movies]; 
    loadMovies();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    moviesContainer.innerText = 'Error fetching movie data.';
  });

loadButton.addEventListener('click', loadMovies);
const searchInput = document.getElementById('search');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().startsWith(query)
  );
  
  // Clear the current movies display
  moviesContainer.innerHTML = '';
  
  // Display filtered movies
  const filteredHTML = filteredMovies.map(movie => ` 
    <div class="movies_box">
      <div class="suggestions_main_card_up">
        <span>HD</span>
      </div>
      <figure>
        <img src="${movie.image}" alt="${movie.title}" />
      </figure>
      <div class="movie_text">
        <h3>${movie.title}</h3>
        <div class="main_text">
          <span>${movie.year}</span>
          <p>${movie.genre}</p>
        </div>
        <button onclick="viewDetails(${movie.id})"><i class="fa-solid fa-play"></i></button>
      </div>
    </div>
  `).join('');

  moviesContainer.innerHTML = filteredHTML;
});

