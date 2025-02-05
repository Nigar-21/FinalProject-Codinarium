let moviesContainer = document.getElementById('movies');
let loadButton = document.getElementById('load');
let movies = [];
let currentIndex = 0;

function displayMovies(movieList) {
  const moviesToShow = movieList.slice(currentIndex, currentIndex + 5);
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
  currentIndex += 5;
  if (currentIndex >= filteredMovies.length) {
    loadButton.style.display = 'none';
  }
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


let product = document.getElementById('blog_content');
let loadbutton = document.getElementById('load');
let blogs = [];
let currentindex = 0;

function loadBlogs() {
  const blogsToShow = blogs.slice(currentindex, currentindex + 3);
  product.innerHTML += blogsToShow.map(blog => ` 
      <div class="blog_box">
        <figure>
          <img src="${blog.image}" alt="${blog.title}" />
        </figure>
        <div class="blog_text">
          <a><span><i class="fa-solid fa-user"></i></span>${blog.author}</a>
          <a>${blog.title}</a>
          <button onclick="viewdetails(${blog.id})">Read More</button>
        </div>
      </div>
  `).join('');

  currentindex += 3;
  if (currentindex >= blogs.length) {
    loadbutton.style.display = 'none';
  }
}

function viewdetails(id) {
  const blog = blogs.find(blog => blog.id === id);
  localStorage.setItem('selectedBlog', JSON.stringify(blog));
  window.location.href = 'blog_single.html';
}

fetch('http://localhost:3000/myblog')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    blogs = data;
    loadBlogs();
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    product.innerText = 'Error fetching blog data.';
  });

loadbutton.addEventListener('click', loadBlogs);
