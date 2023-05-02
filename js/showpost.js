import  format  from 'https://unpkg.com/fecha@4.2.3/lib/fecha.js';



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
    .then((response) => response.json())
        .then((data) => {
            renderPosts(data.data.children.map((data) => data.data))
        })



function renderPosts(item) {
    item.forEach((elem) => {
        let date = new Date(elem.created_utc)
        let div = document.createElement('div');
        div.className = "post";
        div.innerHTML = `<div class="container">
            <div class="subforum">
                <div class="subforum-title">
                    <h1>${elem.title}</h1>
                </div>

                <div class="subforum-row center">
                    <div class="subforum-stats subforum-column center">
                    <div class="vote-button">
                        <div class="like">
                            <span class="plus cursor">+</span> <span id="${elem.id}" class="counter">0</span> <span class="minus cursor">-</span>
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
        </div>`;
        document.body.appendChild(div);
    })
}