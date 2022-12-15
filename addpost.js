const navBar = document.querySelector(".add-post-button")
const formElement = document.getElementById('post-form')

let idNum = +localStorage.getItem("idNum") || 2

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement); // создаём объект FormData, передаём в него элемент формы
    // теперь можно извлечь данные
    let name = formData.get('username');
    let subject = formData.get('subject');
    let title = formData.get('title');

    idNum = (idNum + 1)
    localStorage.setItem("idNum", idNum)


    let div = document.createElement('div');
    div.className = "container";
    div.innerHTML = "<div class=\"subforum\">\n" +
        "                <div class=\"subforum-title\">\n" +
        "                    <h1>${title}</h1>\n" +
        "                </div>\n" +
        "\n" +
        "                <div class=\"subforum-row center\">\n" +
        "                    <div class=\"subforum-stats subforum-column center\">\n" +
        "                    <div class=\"vote-button\">\n" +
        "                        <div class=\"like\">\n" +
        "                            <span class=\"plus cursor\">+</span> <span id=\"${idNum}\" class=\"counter\">0</span> <span class=\"minus cursor\">-</span>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"subforum-description subforum-column center\">\n" +
        "                        <p>${subject}</p>\n" +
        "                    </div>\n" +
        "                    <div class=\"subforum-stats subforum-column center\">\n" +
        "                        <span>${name} | Date</span>\n" +
        "                    </div>\n" +
        "                </div>\n" +
        "            </div>";

    let object = {
        id: idNum,
        author: name,
        title: title,
        subject: subject,
        rating: 0
    }

    let posts

    if (!localStorage.getItem("posts")) {
        posts = []
    }
    else {
        posts = JSON.parse(localStorage.getItem("posts"))
    }

    posts.push(object)

    localStorage.setItem("posts", JSON.stringify(posts))

    navBar.after(div);
})

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
    let text = posts[i].text

    let div = document.createElement('div');
    div.className = "post";
    div.innerHTML = div.innerHTML = `<div class="container">
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
                        <span>${authorName} | Date</span>
                    </div>
                </div>
            </div>
        </div>`;
    navBar.after(div);
}