import { format }  from 'fecha';



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
    let postDate = posts[i].postDate

    let div = document.createElement('div');
    div.className = "post";
    div.innerHTML = `<div class="container">
            <div class="subforum">
                <div class="subforum-title">
                    <h1>${title}</h1>
                </div>

                <div class="subforum-row center">
                    <div class="subforum-stats subforum-column center">
                    <div class="vote-button">
                        <div class="like">
                            <span class="plus cursor">+</span> <span id="${id}" class="counter">${count}</span> <span class="minus cursor">-</span>
                        </div>
                    </div>
                    </div>
                    <div class="subforum-description subforum-column center">
                        <p>${text}</p>
                    </div>
                    <div class="subforum-stats subforum-column center">
                        <span>${authorName} | ${postDate}</span>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.appendChild(div);
}

fetch('https://www.reddit.com/r/Jokes.json')
    .then(response => response.json())
    .then(data => {
        const posts = data.data.children;
        const container = document.getElementById('posts');
        posts.forEach(elem => {
            const post = document.createElement('div');
            post.innerHTML = `
        <div class="container">
          <div class="subforum">
              <div class="subforum-title">
                  <h1>${elem.data.title}</h1>
              </div>

              <div class="subforum-row center">
                  <div class="subforum-stats subforum-column center">
                      <div class="vote-button">
                          <div class="like">
                              <span class="plus cursor">+</span> <span id="${elem.data.id}" class="counter">0</span> <span class="minus cursor">-</span>
                          </div>
                      </div>
                  </div>
                  <div class="subforum-description subforum-column center">
                      <p>${elem.data.selftext}</p>
                  </div>
                  <div class="subforum-stats subforum-column center">
                      <span>
                          <p>${elem.data.author}</p> 
                          <p>${new Date(elem.data.created_utc * 1000).toLocaleDateString()}</p>
                      </span>
                  </div>
              </div>
          </div>
        </div>
      `;
            container.appendChild(post);
        });
    })
    .catch(error => console.log(error));


const form = document.getElementById('search-form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const subreddit = document.getElementById('search-input').value;
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
        .then(response => response.json())
        .then(data => {
            const posts = data.data.children;
            const container = document.getElementById('posts');
            container.innerHTML = '';
            posts.forEach(elem => {
                const post = document.createElement('div');
                post.innerHTML = `
          <div class="container">
            <div class="subforum">
                <div class="subforum-title">
                    <h1>${elem.data.title}</h1>
                </div>

                <div class="subforum-row center">
                    <div class="subforum-stats subforum-column center">
                        <div class="vote-button">
                            <div class="like">
                                <span class="plus cursor">+</span> <span id="${elem.data.id}" class="counter">0</span> <span class="minus cursor">-</span>
                            </div>
                        </div>
                    </div>
                    <div class="subforum-description subforum-column center">
                        <p>${elem.data.selftext}</p>
                    </div>
                    <div class="subforum-stats subforum-column center">
                        <span>
                            <p>${elem.data.author}</p> 
                            <p>${new Date(elem.data.created_utc * 1000).toLocaleDateString()}</p>
                        </span>
                    </div>
                </div>
            </div>
          </div>
        `;
                container.appendChild(post);
            });
        })
        .catch(error => console.log(error));
});

const form = document.getElementById('post-form');
const postList = document.getElementById('post-list');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const title = document.getElementById('title').value;
    const subject = document.getElementById('subject').value;
    const date = luxon.DateTime.now().toString();
    const post = { username, title, subject, date };
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    alert('Post added successfully');

    // Создаем элемент для нового поста и добавляем его в список
    const postItem = document.createElement('li');
    const postTitle = document.createElement('h3');
    postTitle.textContent = title;
    const postDate = document.createElement('p');
    postDate.textContent = date;
    const postSubject = document.createElement('p');
    postSubject.textContent = subject;
    postItem.appendChild(postTitle);
    postItem.appendChild(postDate);
    postItem.appendChild(postSubject);
    postList.appendChild(postItem);
});
