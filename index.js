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