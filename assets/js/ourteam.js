let product = document.getElementById('experts');

fetch('http://localhost:3000/experts') 
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    product.innerHTML = data.map(expert => ` 
        <div class="expert_box">
        <figure>
        <img src="${expert.image}" alt="${expert.title}" />
        </figure>
        <div class="expert_text">
        <h3>${expert.name}</h3>
        <p>${expert.profession}</p>
        </div>
         <div class="icon">
         <a href="https://www.instagram.com/"><i class="fa-brands fa-facebook-f"></i></a>
         <a href="https://www.facebook.com/?locale=az_AZ"><i class="fa-brands fa-instagram"></i></a>
         <a href="https://www.linkedin.com/feed/"><i class="fa-brands fa-linkedin-in"></i></a>
         <a href="https://www.youtube.com/"><i class="fa-brands fa-youtube"></i></a>
        </div>
        </div>
    `).join('');
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    product.innerText = 'Error fetching movie data.';
  });


