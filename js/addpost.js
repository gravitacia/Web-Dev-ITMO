import { DateTime } from "luxon";

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
