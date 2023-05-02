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
        console.log(event.target.parentElement.querySelector(".counter").innerHTML)
        event.target.parentElement.querySelector(".counter").innerText = parseInt(event.target.parentElement.querySelector(".counter").innerText) + 1;
    }

    if (event.target.classList.contains("minus")) {
        console.log(event.target.parentElement.querySelector(".counter").innerHTML)
        event.target.parentElement.querySelector(".counter").innerText = parseInt(event.target.parentElement.querySelector(".counter").innerText) - 1;
    }
});

function renderPosts(item) {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';

    item.forEach((elem) => {
        const date = new Date(elem.created_utc);
        const div = document.createElement('div');
        div.className = 'post';
        div.innerHTML = `
      <div class="container">
        <div class="subforum">
          <div class="subforum-title">
            <h1>${elem.title}</h1>
          </div>

          <div class="subforum-row center">
            <div class="subforum-stats subforum-column center">
              <div class="vote-button">
                <div class="like">
                  <span class="plus cursor">+</span>
                  <span id="${elem.id}" class="counter">0</span>
                  <span class="minus cursor">-</span>
                </div>
              </div>
            </div>
            <div class="subforum-description subforum-column center">
              <p>${elem.selftext}</p>
            </div>
            <div class="subforum-stats subforum-column center">
              <span>
                <p>${elem.author}</p> 
                <p>${date.toLocaleDateString()}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
        postsDiv.appendChild(div);
    });
}


let posts

if (!localStorage.getItem("posts")) {
    posts = []
}
else {
    posts = JSON.parse(localStorage.getItem("posts"))
}

for (let i = 0; i < posts.length; i++) {
    console.log(posts[i])
    let count = posts[i].rating
    let authorName = posts[i].author
    let title = posts[i].title
    let id = posts[i].id
    let text = posts[i].subject
    let day = posts[i].day
    let month = posts[i].month
    let year = posts[i].year

    let div = document.createElement('div');
    div.className = "post";
    div.innerHTML = '<div class="container">' +
        '<div class="subforum">' +
        '<div class="subforum-title">' +
        '<h1>' + title + '</h1>' +
        '</div>' +

        '<div class="subforum-row center">' +
        '<div class="subforum-stats subforum-column center">' +
        '<div class="vote-button">' +
        '<div class="like">' +
        '<span class="plus cursor">+</span> <span id="' + id + '" class="counter">' + count + '</span> <span class="minus cursor">-</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="subforum-description subforum-column center">' +
        '<p>' + text + '</p>' +
        '</div>' +
        '<div class="subforum-stats subforum-column center">' +
        '<span>' + authorName + ' | ' + day + '.' + month + '.' + year + '</span>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
    document.body.appendChild(div);
}