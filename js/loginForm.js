const formElement = document.getElementById('login-form')

formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(formElement);
    let username = formData.get('username');
    let password = formData.get('password');

    let users = JSON.parse(localStorage.getItem("users"))

    let user = users.find(user => user.username === username && user.password === password)

    if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        window.location.href = "index.html"
    }
    else {
        alert("Invalid username or password")
    }
})