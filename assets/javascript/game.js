//Display, the following text:

    //Press any key to get started!{d:},
    
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

// Used to store the randomly Movie name
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

    if (usedMovie.indexOf(theMovie) > -1) {
        while ((usedMovie.indexOf(theMovie) > -1) && (usedMovie.length != movieBank.length)) {
            randomIndex = Math.floor(Math.random() * (movieBank.length));
            theMovie = movieBank[randomIndex].d;
        }
};

//change user answer to lower case
theMovie = theMovie.toLowerCase();

//Runs through until no more movies to guess
//Condition for user to answer yes or no if wants to continue game

if (usedMovie.length === movieBank.length) {
    gameContinue = 'n';
    $("#display").html("You have guessed all the movies I have to offer!");
    var confirmContinue = confirm("You have guessed all the movies I have to offer! Restart?");
    
    if (confirmContinue === true) {
        gameContinue = 'y';

        usedMovie = [];

        resetBoard();
        renderQuestion();
    }
    else {
        $("#display").html("Thanks for playing!");
    }
}

if (gameContinue === 'y') {
    for (i = 0; i < theMovie.length; i++) {

        // converts Movie name to underscore
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
    $("#hint").html("<b>Here's a hint:</b>  " + movieBank[randomIndex].r);    
    usedMovie.push(movieBank[randomIndex].d);
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

// Function when called, resets the game board display

function resetBoard() {
    tries = 10;
    updateTries();

    guesses = [];
    underScore = [];
    answer = [];
    compareAnswer = "";

    updateGuessed();
    updateScore();

    $("#wordguess").html("");
    $("#display").html("");
    $(".right-side").html("");
}


// Function when called declaring the user had lost and asks if they want to play again- If yes continue- if no gam ends

function newGame() {
    var confirmContinue = confirm("Game over! Do you want to play again?");

    if (confirmContinue === true) {
        gameContinue = 'y';
        score = 0;

        $(".left-side").css("border", "1px solid black");
        resetBoard();
        renderQuestion();
    }
    else
        gameContinue = 'n';
}


// Function when called will display a popup confirmation box asking if user wants to continue to next round or cancel

function continueGame() {
    var confirmContinue = confirm("Move onto next movie?");

    if (confirmContinue === true) {
        gameContinue = 'y';
        resetBoard();
        renderQuestion();
    }
    else {
        gameContinue = 'n';
        $("#display").html("Thanks for playing!");
    }

}


// Function to check the win condition, compares letters on display in HTML with the Movie name for the game round

function checkWin() {
    var wordGuessBox = $("#wordguess").text();

    if (wordGuessBox === compareAnswer) {

        $("#display").html("Congratulations, you guessed the name!");
        $(".right-side").html(heroImage);
        score++;
        gameContinue = 'n';
        updateGuessed();
        updateTries();
        updateScore();
        setTimeout(continueGame, 1000);  // delays continueGame function by 1 sec to allow the HTML page to fully display the updated letters
        return;
    }
}


// Function to check the loss condition, if the tries equals to 0 updates display and pushes out Game Over msg onto HTML page then calls newGame function
function checkLoss() {
    if (tries === 0) {
        updateGuessed();
        $(".left-side").css("border", "5px solid red");
        $("#display").html("Game Over! The answer was '" + theMovie + "'.");
        gameContinue = 'n';
        setTimeout(newGame, 1000);  // delays checkLoss function by 1 sec to allow the HTML page to fully display the updated letters
        return;
    }
}

// Calling functions to start the game.
renderQuestion();
updateGuessed();
updateTries();
updateScore();


// When the user presses a key, it will run the following function
document.onkeyup = function (event) {

    // Determine which key was pressed, turns it lowercase, and stores it into the userInput variable.
    var userInput = event.key.toLowerCase();

    // Variable used to detect the keycode (number associated with the key you pressed)
    var key = event.keyCode;

    // check to see if the game is still in play
    if (gameContinue === 'y') {
        // conditional to make sure the key you pressed is accepted for guessing ('a' and 'A' both share the same keycode 65 for example, same with 'z' and 'Z' being keycode 90)
        if (key >= 65 && key <= 90) {

            // conditional check that compares the userinput with each letter of theMovie array
            // if no letter matched, indexOf value will be -1, it will enter the If statement below, takes away 1 from remaining tries
            // while pushing your current guessed letter to the guess array for record keeping and display
            if (theMovie.indexOf(userInput) < 0) {
                tries--;

                // Checks user's input in the array of guesses box
                // If the guessed letter is not found in array, pushes the letter into the guesses box and updates info display to let user know they made a wrong guess
                // Else condition used to catch situation when user attempts to press same letter key already guessed, should not duplicate letter into guesses box repeatedly
                if (guesses.indexOf(userInput) < 0) {
                    guesses.push(userInput);
                    $("#display").html(userInput + " is not found in the word, removed 1 strike from total!");
                } else {
                    $("#display").html("Warning! You pressed '" + userInput + "' which you already have guessed before.");
                }

                updateGuessed();
                updateTries();
            }
            else {
                // Loops entire length of Movie name to compare each letter in index
                // if guessed letter matches, updates the word guessing display to replace the underscore with the correctly guessed letter
                // also updates letters guessed box with user's current guess
                for (i = 0; i < theMovie.length; i++) {
                    if (theMovie[i] === userInput) {
                        underScore[i] = userInput;
                        updateDisplay();
                    }
                }

                // Checks user's input in the array of guesses box
                // If the guessed letter is not found in array, pushes the letter into the guesses box and updates info display to let user know they made a correct letter guess
                // Else condition used to catch situation when user attempts to press same letter key already guessed, should not duplicate letter into guesses box repeatedly
                if (guesses.indexOf(userInput) < 0) {
                    guesses.push(userInput);
                    $("#display").html("Good job! You guessed a letter correctly!");
                } else {
                    $("#display").html("Warning! You pressed '" + userInput + "' which you already have guessed before.");
                }

                updateDisplay();
                updateGuessed();
                checkWin();
            }
        }
        else
            $("#display").html("Warning! You pressed '" + userInput + "' which is an invalid key.");
    }

    checkLoss();
};
