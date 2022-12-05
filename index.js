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