const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));

if (selectedMovie) {
  const detailDiv = document.getElementById('detail');
  
  detailDiv.innerHTML = `
    <div class="detail_box">
      <figure>
        <img src="${selectedMovie.image}" alt="${selectedMovie.title}" />
      </figure>
      <div class="box_text">
      <div class="head_text">
       <h2>${selectedMovie.title}</h2>
        <p> ${selectedMovie.description}</p>
      </div>
         <div class="body">
         <div class="one">
         <p><strong>Director:</strong> ${selectedMovie.director}</p>
        <p><strong>Year:</strong> ${selectedMovie.year}</p>
        <p><strong>Actors: </strong>Rosario, Bruce Willi, Hailo, Josh Duhamel</p>
        <p><strong>Country: </strong>USA</p>
        </div>
         <div class="one">
         <p><strong>Rating:</strong><span>${selectedMovie.rating}</span> </p>
        <p><strong>Genre:</strong> ${selectedMovie.genre.join(', ')}</p>
         <p><strong>Duration:</strong>2h 30min</p>
        <p><strong>Quality:</strong><span>HD</span></p>
        </div>
         </div>
        </div>
      </div>
    </div>
    <div class="side_detail">
    <h3>Download:</h3>
    <div class="btns">
    <button><i class="fa-solid fa-download"></i>DOWNLOAD:576p</button>
    <button><i class="fa-solid fa-download"></i>DOWNLOAD:720p</button>
    <button><i class="fa-solid fa-download"></i>DOWNLOAD:1080p</button>
    </div>
    </div>
  `;
} else {
  console.error("Seçilmiş film tapılmadı.");
}

