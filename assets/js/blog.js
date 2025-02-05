let product = document.getElementById('blog_content');
let loadButton = document.getElementById('load');
let blogs = [];
let currentIndex = 0;

function loadBlogs() {
  const blogsToShow = blogs.slice(currentIndex, currentIndex + 6);
  product.innerHTML += blogsToShow.map(blog => ` 
      <div class="blog_box">
        <figure>
          <img src="${blog.image}" alt="${blog.title}" />
        </figure>
        <div class="blog_text">
          <a><span><i class="fa-solid fa-user"></i></span>${blog.author}</a>
          <a>${blog.title}</a>
          <button onclick="viewDetails(${blog.id})">Read More</button>
        </div>
      </div>
  `).join('');

  currentIndex += 6;
  if (currentIndex >= blogs.length) {
    loadButton.style.display = 'none';
  }
}

// Blog detallarını `localStorage`-a göndərən funksiya
function viewDetails(id) {
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

loadButton.addEventListener('click', loadBlogs);
