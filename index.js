function navButton() {
    var x = document.getElementById("myTopnav");
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

const container = document.getElementById("container");
const postIncrease = 3;
const postLimit = 99;
const pageCount = Math.ceil(cardLimit / postIncrease);
let currentPage = 1;

const createPost = () => {
    const post = document.createElement("div");
    post.className = "subforum";
    post.innerHTML = addPost();
    container.appendChild(post);
}

const showPost = (pageIndex) => {
    currentPage = pageIndex;

    const startRange = (pageIndex - 1) * cardIncrease;
    const endRange = currentPage === pageCount ? postLimit : pageIndex * cardIncrease;

    for (let i = startRange + 1; i <= endRange; i++) {
        createPost();
    }
}

window.onload = function () {
    showPost(currentPage);
};

const handleInfiniteScroll = () => {
    const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

    if (endOfPage) {
        showPost(currentPage + 1);
    }
};

window.addEventListener("scroll", handleInfiniteScroll);