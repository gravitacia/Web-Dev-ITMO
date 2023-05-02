// Получаем элемент для отображения списка постов
const postList = document.getElementById('post-list');

// Получаем все посты из localStorage
const posts = JSON.parse(localStorage.getItem('posts')) || [];

// Проходимся по каждому посту и создаем элемент для его отображения
posts.forEach(post => {
    const postItem = document.createElement('li');
    const postTitle = document.createElement('h3');
    postTitle.textContent = post.title;
    const postDate = document.createElement('p');
    postDate.textContent = post.date;
    const postSubject = document.createElement('p');
    postSubject.textContent = post.subject;
    postItem.appendChild(postTitle);
    postItem.appendChild(postDate);
    postItem.appendChild(postSubject);
    postList.appendChild(postItem);
});
