function navButton() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("plus")) {
        console.log(event.target.parentElement.querySelector(".counter").innerHTML);
        event.target.parentElement.querySelector(".counter").innerText = parseInt(
            event.target.parentElement.querySelector(".counter").innerText
        ) + 1;
    }

    if (event.target.classList.contains("minus")) {
        console.log(event.target.parentElement.querySelector(".counter").innerHTML);
        event.target.parentElement.querySelector(".counter").innerText = parseInt(
            event.target.parentElement.querySelector(".counter").innerText
        ) - 1;
    }

    if (event.target.id === "comment-button") {
        let commentsModal = event.target.parentElement.querySelector(".view-comments");
        commentsModal.style.display = "block";
    }

    if (event.target.classList.contains("close-comm-btn")) {
        let commentsModal = event.target.parentElement.parentElement;
        commentsModal.style.display = "none";
    }
});

const posts = JSON.parse(localStorage.getItem("posts")) || [];

for (let i = 0; i < posts.length; i++) {
    let commentsHtml = "";
    let count = 0;
    const { userId, title, id, body } = posts[i];
    const postComments = JSON.parse(localStorage.getItem("comments")) || [];
    const filteredComments = postComments.filter((comment) => comment.postId === id);

    if (filteredComments.length) {
        for (let j = 0; j < filteredComments.length; j++) {
            commentsHtml += `
        <ul>
          <li>
            <p>${filteredComments[j].text}</p>
            <p>By ${filteredComments[j].userId}</p>
          </li>
          <hr>
        </ul>
      `;
        }
    } else {
        commentsHtml = "<p>No comments yet</p>";
    }

    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `
    <div class="container">
      <div class="subforum">
        <div class="subforum-title">
          <h1>${title}</h1>
        </div>

        <div class="subforum-row center">
          <div class="subforum-stats subforum-column center">
            <div class="vote-button">
              <div class="like">
                <span class="plus cursor">+</span>
                <span id="${id}" class="counter">${count}</span>
                <span class="minus cursor">-</span>
              </div>
            </div>
          </div>

          <div class="subforum-description subforum-column center">
            <p>${body}</p>
          </div>

          <div class="subforum-stats subforum-column center">
            <span>User ${userId} | ${new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <div class="modal fade" id="comments-modal-${id}" tabindex="-1" role="dialog" aria-labelledby="commentsModal" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="commentsModal">Comments</h5>
                </button>
              </div>

              <div class="modal-body">
                ${commentsHtml}
              </div>

              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    document.body.appendChild(div);
}



