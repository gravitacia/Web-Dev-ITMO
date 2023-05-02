import { format }  from 'fecha';

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

