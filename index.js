/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function navButton() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}


var counterVal = 0;

function incrementClick() {
    updateDisplay(++counterVal);
}

function decrementCounter() {
    if(counterVal > 0) {
        updateDisplay(--counterVal);
    }
    else{
        counterVal = 0;
        updateDisplay(counterVal);
    }
}

function updateDisplay(val) {
    document.getElementById("counter-label").innerHTML = val;
}

// Выбираем все элементы с классом like
const likes = document.querySelectorAll('.like');

// В каждом элементе выбираем плюс и минус. Навешиваем на событие клик функцию render()
likes.forEach(like => {
    const plus = like.querySelector('.plus');
    const minus = like.querySelector('.minus');
    const counter_element = like.querySelector('.counter');

    let counter = 0;

    plus.addEventListener('click', () => {
        render(++counter, counter_element);
    });

    minus.addEventListener('click', () => {
        render(--counter, counter_element)
    });
});

// Функция обновляет текст
const render = (counter, counter_element) => counter_element.innerText = counter;
