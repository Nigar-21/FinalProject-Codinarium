const selectedBlog = JSON.parse(localStorage.getItem('selectedBlog'));

if (selectedBlog) {
  const detailDiv = document.getElementById('detail');
  detailDiv.innerHTML = `
    <div class="detail_box">
    <figure>
         <img src="${selectedBlog.image}" alt="${selectedBlog.title}" />
     </figure>
     <div class="box_text">
    <p><span><i class="fa-solid fa-user"></i></span> ${selectedBlog.author}</p>
    <h2>${selectedBlog.title}</h2>
    <span>${selectedBlog.info}</span>
    </div>
    <div class="advice">
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.</p>
    <div class="author">
    <div class="line"></div>
    <h4>Mark Crawford</h4>
    </div>
    </div>
    <p>In a free hour when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection.</p>
    <div class="image">
    <figure>
    <img src="https://live.themewild.com/moplay/assets/img/blog/01.jpg" alt="">
    </figure> 
    <figure>
    <img src="https://live.themewild.com/moplay/assets/img/blog/02.jpg" alt="">
    </figure>
    </div>
    <p>
    Power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection.
    </p>
    </div>
  `;
} else {
  console.error("Blog details not found.");
}
document.addEventListener('DOMContentLoaded', function() {
    const commentsContainer = document.querySelector('.body');
    const contactForm = document.getElementById('contactForm');

    // Yorumları fetch et
    function fetchComments() {
        fetch('http://localhost:3000/comments')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                commentsContainer.innerHTML = ""; // Önceki yorumları temizle
                if (data.comment && Array.isArray(data.comment)) {
                    data.comment.forEach(displayComment);
                } else {
                    console.error("Yorumlar tanımlı değil veya bir dizi değil.");
                }
            })
            .catch(error => console.error("Error fetching comments:", error));
    }

    // Her bir yorumu görüntüle
    function displayComment(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `
            <h4>${comment.name}</h4>
            <p>${comment.message}</p>
            <p>${new Date(comment.date).toLocaleDateString()}</p>
            <p>Likes: <span class="likes">${comment.likes}</span> Dislikes: <span class="dislikes">${comment.dislikes}</span></p>
            <button class="like" data-id="${comment.id}">Like</button>
            <button class="dislike" data-id="${comment.id}">Dislike</button>
            <button class="reply" data-id="${comment.id}">Reply</button>
            <div class="replies"></div>
        `;
        commentsContainer.appendChild(commentDiv);
    }

    // Form gönderim olayını dinle
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Formun gönderilmesini durdur

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Yorum verisi
        const commentData = {
            name: name,
            email: email,
            message: message,
            date: new Date().toISOString() // Bugünün tarihi ISO formatında
        };

        // POST isteği gönder
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Comment added:', data); // Yeni yorumu kontrol et
            fetchComments(); // Yorumları tekrar çek
            contactForm.reset(); // Formu sıfırla
        })
        .catch(error => console.error("Error posting comment:", error));
    });

    // Yorumları güncelleme için beğeni ve beğenmeme işlevselliği
    commentsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('like')) {
            handleLikeDislike(event.target.dataset.id, 'like');
        } else if (event.target.classList.contains('dislike')) {
            handleLikeDislike(event.target.dataset.id, 'dislike');
        }
    });

    // Beğeni ve beğenmeme işlemi
    function handleLikeDislike(commentId, action) {
        fetch(`http://localhost:3000/comment/${commentId}/${action}`, {
            method: 'PATCH'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(`Successfully ${action}d comment:`, data);
            fetchComments(); // Yorumları tekrar çek
        })
        .catch(error => console.error(`Error ${action}ing comment:`, error));
    }

    // Sayfa yüklendiğinde yorumları çek
    fetchComments();
});
