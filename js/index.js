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


const postTemplate = ({ author, title, subject, rating, id, day, month, year }) => `
    <div class="post">
        <div class="container">
            <div class="subforum">
                <div class="subforum-title">
                    <h1>${title}</h1>
                </div>

                <div class="subforum-row center">
                    <div class="subforum-stats subforum-column center">
                        <div class="vote-button">
                            <div class="like">
                                <span class="plus cursor" data-id="${id}">+</span>
                                <span id="${id}" class="counter">${rating}</span>
                                <span class="minus cursor" data-id="${id}">-</span>
                            </div>
                        </div>
                    </div>
                    <div class="subforum-description subforum-column center">
                        <p>${subject}</p>
                    </div>
                    <div class="subforum-stats subforum-column center">
                        <span>${author} | ${day}.${month}.${year}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

function renderPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postContainer = document.querySelector('#post-container');
    postContainer.innerHTML = '';
    posts.forEach(post => {
        const html = postTemplate(post);
        postContainer.insertAdjacentHTML('beforeend', html);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    document.addEventListener('click', event => {
        if (event.target.classList.contains('plus')) {
            const id = event.target.dataset.id;
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const index = posts.findIndex(post => post.id === id);
            if (index > -1) {
                posts[index].rating++;
                localStorage.setItem('posts', JSON.stringify(posts));
                document.querySelector(`#${id}`).textContent = posts[index].rating;
            }
        } else if (event.target.classList.contains('minus')) {
            const id = event.target.dataset.id;
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const index = posts.findIndex(post => post.id === id);
            if (index > -1) {
                posts[index].rating--;
                localStorage.setItem('posts', JSON.stringify(posts));
                document.querySelector(`#${id}`).textContent = posts[index].rating;
            }
        }
    });
});
