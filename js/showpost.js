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
                        <span>${authorName} | ${day}.${month}.${year}</span>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.appendChild(div);
}

fetch('https://dummyjson.com/posts')
    .then((response) => response.json())
    .then((data) => {
            renderPosts(data["posts"])
    })

function renderPosts(posts) {
    posts.forEach((item) => {
        let div = document.createElement('div');
        div.className = "post";
        div.innerHTML = `<div class="container">
            <div class="subforum">
                <div class="subforum-title">
                    <h1>${item.title}</h1>
                </div>

                <div class="subforum-row center">
                    <div class="subforum-stats subforum-column center">
                    <div class="vote-button">
                        <div class="like">
                            <span class="plus cursor">+</span> <span id="${item.id}" class="counter">0</span> <span class="minus cursor">-</span>
                        </div>
                    </div>
                    </div>
                    <div class="subforum-description subforum-column center">
                        <p>${item.body}</p>
                    </div>
                    <div class="subforum-stats subforum-column center">
                        <span>${item.authorName} | 0</span>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.appendChild(div);
    })
}