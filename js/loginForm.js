// Select the necessary elements
const openLog = document.getElementById("login-button");
const login_modal = document.getElementById("login-modal");
const closeLog = document.querySelectorAll(".close-login-btn");
const loginForm = document.getElementById("login-form");
const nav = document.getElementById("myTopnav");

// Define the openModal() function
const openModal = () => {
    login_modal.style.display = "block";
};

// Define the closeModal() function
const closeModal = () => {
    login_modal.style.display = "none";
};

// Use addEventListener to handle the click event on openLog button
openLog.addEventListener("click", openModal);

// Use forEach() method to attach click handler to each closeLog button
closeLog.forEach((button) => {
    button.addEventListener("click", closeModal);
});

// Use addEventListener to handle the submit event on loginForm
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const blockedUsers = JSON.parse(localStorage.getItem("blockedUsers")) || [];
    let user = users.find((u) => u.name === username); // ищем пользователя только по имени
    if (!user) {
        // Если пользователь не существует, добавляем его в localStorage и делаем его текущим пользователем
        user = {name: username, pass: password};
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
    } else if (user.pass !== password) {
        alert("Invalid Credentials");
        return;
    }
    if (blockedUsers.includes(user.name)) {
        alert("User is blocked");
        return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    updateNavbar(user);
});

// Define the updateNavbar() function
const updateNavbar = (user) => {
    // Create the necessary elements
    const loginedAs = document.createElement("span");
    const logoutButton = document.createElement("button");
    const navLinks = document.querySelectorAll(".nav-link");

    // Hide the login modal and login button
    login_modal.style.display = "none";
    openLog.style.display = "none";

    // Check if the current user is blocked
    const blockedUsers = JSON.parse(localStorage.getItem("blockedUsers")) || [];
    if (blockedUsers.includes(user.name)) {
        alert("You are blocked from accessing this site");
        localStorage.removeItem("currentUser");
        location.reload();
        return;
    }

    // Set the loginedAs and logoutButton elements
    loginedAs.innerHTML = `Logined as ${user.name}`;
    logoutButton.innerHTML = `Logout`;
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("currentUser");
        location.reload();
    });

    // Append the loginedAs and logoutButton elements to nav
    nav.appendChild(loginedAs);
    nav.appendChild(logoutButton);

    // Add the new-nav-link class to all nav-links
    navLinks.forEach((link) => {
        link.classList.add("new-nav-link");
    });

    // Allow root user to add event and block user
    if (user.name === "root") {
        // Create the addEventButton and blockUserButton elements
        const addEventButton = document.createElement("a");
        const blockUserButton = document.createElement("a");

        // Set the addEventButton element
        addEventButton.innerHTML = `Add Event`;
        addEventButton.href = "/pages/add-event.html";
        addEventButton.addEventListener("click", addEvent);

        // Set the blockUserButton element
        blockUserButton.innerHTML = `Block User`;
        blockUserButton.href = "#";
        blockUserButton.addEventListener("click", blockUser);

        // Append the addEventButton and blockUserButton elements to nav
        nav.appendChild(addEventButton);
        nav.appendChild(blockUserButton);

        // Add the new-nav-link class to all nav-links
        navLinks.forEach((link) => {
            link.classList.add("new-nav-link");
        });
    }
};

// Define the blockUser() function
const blockUser = () => {
    const username = prompt("Enter username to block:");
    if (username) {
        // Add the blocked user to the blockedUsers array in localStorage
        const blockedUsers = JSON.parse(localStorage.getItem("blockedUsers")) || [];
        blockedUsers.push(username);
        localStorage.setItem("blockedUsers", JSON.stringify(blockedUsers));

        // Remove the blocked user from the users array in localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.filter((u) => u.name !== username);
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        // Remove the current user from localStorage if they are blocked
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (currentUser && currentUser.name === username) {
            localStorage.removeItem("currentUser");
        }
    }
};

// Define the addEvent() function
const addEvent = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Check if the current user is root
    if (currentUser && currentUser.name === "root") {
        const eventName = prompt("Enter event name:");
        const eventDescription = prompt("Enter event description:");

        // Add the event to localStorage and update the page
        if (eventName && eventDescription) {
            const ongoingEvent = document.createElement("div");
            ongoingEvent.innerHTML = `Ongoing event - ${eventName}`;
            nav.insertBefore(ongoingEvent, nav.firstChild);
            localStorage.setItem("currentEvent", JSON.stringify({ name: eventName, description: eventDescription }));
            location.reload(); // Reload the page to update the navbar with the new ongoing event
        }
    }
};