const form = document.getElementById('post-form');
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
});
