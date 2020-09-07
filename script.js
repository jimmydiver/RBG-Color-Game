// variable for number of squares shown
let numSquares = 6;
let colors = [];
//identify picked color
let pickedColor
// identify squares from html
let squares = document.querySelectorAll(".square");
// identify RGB color written in span
let colorDisplay = document.getElementById("colorDisplay");
//identify try again message from html
let messageDisplay = document.querySelector("#message");
// select h1
let h1 = document.querySelector("h1");
//select reset button
let resetButton = document.querySelector("#reset");
// select difficulty modeButtons
let modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function () {
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        // add click listeners to squares 
        squares[i].addEventListener("click", function () {
            // grab color of clicked square
            let clickedColor = this.style.backgroundColor;
            // compare clicked color to pickedColor
            if (clickedColor === pickedColor) {
                // give a message for correct choice
                messageDisplay.textContent = "Correct!"
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                //fade out square if incorrect square is clicked 
                this.style.backgroundColor = "#232323";
                // give a message for incorrect choice
                messageDisplay.textContent = "Try Again Homie!"
            }
        });
    }
}

function reset() {
    colors = generateRandomColors(numSquares);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    //change colors of squares
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function () {
    reset();
})

function changeColors(color) {
    // loop thru all squares
    for (let i = 0; i < squares.length; i++) {
        //change each color to match given color
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    //create variable that chooses random number between 1 and 6
    let random = Math.floor(Math.random() * colors.length);
    // return random chosen color
    return colors[random];
}

function generateRandomColors(num) {
    // make an array
    let arr = []
    // repeat num times
    for (let i = 0; i < num; i++) {
        // get random color and push into array
        arr.push(randomColor())
    }
    //return array
    return arr;
}

function randomColor() {
    // pick red from 0-255  
    let r = Math.floor(Math.random() * 256);
    // pick green from 0-255
    let g = Math.floor(Math.random() * 256);
    // pick blue from 0-255
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}