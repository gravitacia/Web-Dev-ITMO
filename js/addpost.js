import { format } from 'https://unpkg.com/browse/fecha@4.2.3/';

format(new Date(), 'YYYY-MM-DD HH:mm:ss');

const formElement = document.getElementById('post-form')

let idNum = +localStorage.getItem("idNum") || 2
let userID = 100;

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    let name = formData.get('username');
    let subject = formData.get('subject');
    let title = formData.get('title');
    let date = new Date();
    let dayWrapper = moment(date);

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
        year: date.getFullYear(),
        postDate: dayWrapper
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