import { format } from 'https://unpkg.com/fecha@4.2.3/lib/fecha.js';


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
                <p>${format(date, 'mediumDate')}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    `;
        postsDiv.appendChild(div);
    });
}

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const searchInput = document.getElementById('search-input');
    const subreddit = searchInput.value.replace('/r/', '');
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then((response) => response.json())
        .then((data) => {
            renderPosts(data.data.children.map((data) => data.data));
        })
        .catch((error) => {
            console.error(error);
        });
});
