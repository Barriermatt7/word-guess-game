//Display, the following text:

    //Press any key to get started!{d:},
    {d:},
    //Wins(# of times user guessed word correctly)
    //object holding letters, movies to guess
    //When game starts display word like _ _ _ _ reveal as user guesses
    //Number of guesses remaining
    //Letters guessed L Z Y etc
    //after win loss automticlly choose another word.

    //----Variables---

    var movieBank = [
        {d: 'mud', r: 'Matthew Mcconaughey'},
        {d:'big', r: 'Tom Hanks'},
        {d:'ted', r:'Mark Walberg'},
        {d:'braveheart', r: 'Mel Gibson'},
        {d:'titanic', r:'Leonardo Dicaprio'},
        {d:'Hero', r:'Jet Lee'},
    ];

//set score to 0 at beggining of game

var score = 0;

//tries user has left

var tries = 10;

//variable for user guesses stored in array *to be displayed on page

var guesses = [];

 // Variable that is used to determine if the game is in play or not
var gameContinue = 'y';

// Variable used to store the value of a randomized number between 0 and the (max array length - 1) of the movieBank array
var randomIndex;

// Used to store the randomly chosen movie name
var theMovie = "";

// Used to keep track if the same movie has been picked again
var usedMovie = [];

// Variable used to convert the random movie name into underscores for text display purposes and also to keep track of the player's guesses
var underScore = [];

// Variable used to convert theMovie into a string array in renderQuestion function
var answer = [];

// Used with answer variable, contents of answer array will be loaded into this string with joined blank spaces in between to be used for comparison to check win condition
var compareAnswer = "";


// --Functions -- 

//Function to render random movie as underscores

function renderQuestion() {
    randomIndex = Math.floor(Math.random() * (movieBank.length));

    theMovie = movieBank[randomIndex].d;

    if (theCurrentMovie.indexOf(theMovie) > -1) {
        while ((theCurrentMovie.indexOf(theMovie) > -1) && (theCurrentMovie.length != movieBank.length)) {
            randomIndex = Math.floor(Math.random() * (movieBank.length));
            theMovie = movieBank[randomIndex].d;
        }
};

//change user answer to lower case
theMovie = theMovie.toLowerCase();

//Runs through until no more movies to guess
//Condition for user to answer yes or no if wants to continue game

if (theCurrentMovie.length === movieBank.length) {
    gameContinue = 'n';
    $("#display").html("You have guessed all the movies I have to offer!");
    var confirmContinue = confirm("You have guessed all the movies I have to offer! Restart?");
    
    if (confirmContinue === true) {
        gameContinue = 'y';

        theCurrentMovie = [];

        resetBoard();
        renderQuestion();
    }
    else {
        $("#display").html("Thanks for playing!");
    }
}

if (gameContinue === 'y') {
    for (i = 0; i < theMovie.length; i++) {

        // converts chosen name to underscore
        // if it encounters a space in the name, will add the space accordingly
        // same with a hypen in the name
        if (theMovie[i] === " ") {
            underScore.push("\xa0");
            answer.push("\xa0");
        }
        else if (theMovie[i] === "-") {
            underScore.push("-");
            answer.push(theMovie[i]);
        }
        else {
            underScore.push("_");
            answer.push(theMovie[i]);
        }
    }

    $("#wordguess").html(underScore.join(" "));
    compareAnswer = answer.join(" ");
    $("#hint").html("<b>Here's a hint:</b>  " + movieBank[randomIndex].h);
    heroImage.attr({ src: movieBank[randomIndex].i, height: "362", width: "auto" });    
    theCurrentMovie.push(movieBank[randomIndex].d);
    }
}

// Function that updates the HTML display for the score
function updateScore() {
    $("#score").html("<b>Score:</b> " + score);
}

// Function that updates the HTML display for the name being guessed
function updateDisplay() {
    $("#wordguess").html(underScore.join(" "));
}


// Function that updates HTML display for the letters the player has guessed
function updateGuessed() {
    $("#guessed").html("<b>Letters You Guessed:</b> " + guesses);
}


// Function that updates the HTML display for the tries left the player has
function updateTries() {
    $("#tries").html("<b>tries Left:</b> " + tries);
}
