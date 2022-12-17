const formElement = document.getElementById('post-form')

let idNum = +localStorage.getItem("idNum") || 2

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement); // создаём объект FormData, передаём в него элемент формы
    // теперь можно извлечь данные
    let name = formData.get('username');
    let subject = formData.get('subject');
    let title = formData.get('title');
    let date = new Date();

    idNum = (idNum + 1)
    localStorage.setItem("idNum", idNum)

    let object = {
        id: idNum,
        author: name,
        title: title,
        subject: subject,
        rating: 0,
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
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
    window.location.reload();
})