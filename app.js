// declaring variables
let button1 = document.querySelector('.darkModeButton');
let button2 = document.querySelector('.resetButton');
const scoreDoc = document.getElementById("score")
let cardContainer = document.getElementById("card-container")
let bodySelect = document.body;
let score = 0

// function to generate cards
function init() {

    // creates array with id and image
    let cards = [
        {
            id: 1,
            image: "images/ace.png"
        },
        {
            id: 1,
            image: "images/ace.png"
        },
        {
            id: 2,
            image: "images/heart.png"
        },
        {
            id: 2,
            image: "images/heart.png"
        },
        {
            id: 3,
            image: "images/clover.png"
        },
        {
            id: 3,
            image: "images/clover.png"
        },
        {
            id: 4,
            image: "images/diamond.png"
        },
        {
            id: 4,
            image: "images/diamond.png"
        },
        {
            id: 5,
            image: "images/horse.png"
        },
        {
            id: 5,
            image: "images/horse.png"
        },
        {
            id: 6,
            image: "images/crown.png"
        },
        {
            id: 6,
            image: "images/crown.png"
        },
    ]


    // Shuffles array
    cards.sort(function () {
        return Math.random() - 0.5;
    });

    // loop to create the cards
    for (let i = 0; i < cards.length; i++) {

        const newCard = document.createElement("div")
        console.log(cards[i].id)

        // adds id, class and onclick
        newCard.id = cards[i].id
        newCard.classList.add("card-basics")
        newCard.onclick = function () {
            flipCard(this);
        };

        // adds new cards to page
        cardContainer.appendChild(newCard)

        // creates two different divs 
        const frontCard = document.createElement("div")
        const backCard = document.createElement("div")

        // adds front and back side class to new divs
        frontCard.classList.add("front-side-card")
        backCard.classList.add("back-side-card")

        // adds front and back side of the cards to the card
        newCard.appendChild(frontCard)
        newCard.appendChild(backCard)

        // creates and appends image to card
        const cardImg = document.createElement("img")
        cardImg.src = cards[i].image
        backCard.appendChild(cardImg)
    }
}

init()

// create audios
let flipSound = new Audio('sounds/flip-sound.mp3');
let swooshSound = new Audio('sounds/swoosh.mp3');

// lower sound volume
flipSound.volume = 0.3
swooshSound.volume = 1

// speed up sound
flipSound.playbackRate = 2.5;
swooshSound.playbackRate = 2.5;

let card1, card2

// flips cards
function flipCard(el) {

    // checks if card1 and card2 values are the same
    if (card1 && card2) {
        flipSound.play();

        // add onclick
        card1.onclick = function () {
            flipCard(this);
        }
        card2.onclick = function () {
            flipCard(this);
        }

        // removed class flipped
        card1.classList.remove("flipped")
        card2.classList.remove("flipped")

        // sets card1 value to element
        card1 = el
        // remove onclick
        card1.onclick = ""

        console.log("setting card 1: ", el.id)

        // empties card2 value
        card2 = null
        console.log("resetting card2")

        // flips card
        el.classList.add("flipped")

        // checks if card1 has a value
    } else if (card1) {
        flipSound.play();
        console.log("setting card 2: ", el.id)

        // if it does add element to card2
        card2 = el
        // remove onclick
        card2.onclick = ""

        // flips card
        el.classList.add("flipped")

        // check if id from card1 and card2 are the same
        if (card1.id == card2.id) {
            flipSound.play();

            // add class
            card1.classList.add("paired")
            card2.classList.add("paired")

            // plays sound with a delay
            function playswooshAudio() {
                swooshSound.play();
            }
            setTimeout(playswooshAudio, 900)

            // removes onclick
            card2.onclick = ""

            // resets value of card1 and card2
            card1 = null
            card2 = null
            console.log("resetting cards")

            // increases score
            score++

            // Gets scores value and put it in the html
            scoreDoc.innerText = score
        }
        // if none of these are correct
    } else {
        flipSound.play();
        console.log("setting card 1: ", el.id)

        // sets card1 value
        card1 = el

        // flips card
        el.classList.add("flipped")

        // remove onclick
        card1.onclick = ""
    }
}

// function to toggle darkmode
function toggleDarkMode() {
    bodySelect.classList.toggle("bodyDarkMode")
    button1.classList.toggle("pressed")
    button2.classList.toggle("darkModeClass")
    button2.classList.toggle("darkModeHover")
}

// listenes after clicks on first button
button1.addEventListener('click', toggleDarkMode);

// function to reset cards
function reset() {
    let answer = confirm("Are you sure you want to reset the game?");
    if (answer == true) {

        scoreDoc.innerText = 0
        cardContainer.replaceChildren()
        init()
    }
}