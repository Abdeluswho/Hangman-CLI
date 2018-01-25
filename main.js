var inquirer = require('inquirer');
var Word = require('./word.js');
var Letter = require('./letter.js');
var isLetter = require('is-letter');
var Game = require('./game.js');

var hangmanDisplay = Game.hangman;


let Hangman = {
   
    wordBank : Game.wordList,//random word??
    guessesRemaining: 8,
    //empty array to hold letters guessed by user. And checks if the user guessed the letter already
    guessedLetters: [],
    //index to display graphic
    display: 0,
    currentWord: null,
    //welcomes user
    startGame :  function () {
        var that = this;
        //clears guessedLetters before a new game starts if it's not already empty.
        if(this.guessedLetters.length > 0){
            this.guessedLetters = [];
        }

    inquirer.prompt([{
        name: "play",
        type: "confirm",
        message: "Welcome.  Lets start playing loser!!"
    }]).then(function(answer) {
            function resetGuessesRemaining() {
                this.guessesRemaining = 8;
            }

            function newGame() {
                let that = this;
                if(that.guessesRemaining === 8) {

                    var randNum = Math.floor(Math.random()*that.wordBank.length);
                    that.currentWord = new Word(that.wordBank[randNum]);
                    that.currentWord.getLetters();
                    //displays current word as blanks.
                    console.log(that.currentWord.wordRender());
                    that.keepPromptingUser();
                } else{
                    resetGuessesRemaining();
                    newGame();
                }
            }
            newGame();
        });

       
       
       function keepPromptingUser(){
            var that = this;
            //asks player for a letter
            inquirer.prompt([{
                name: "chosenLtr",
                type: "input",
                message: "Choose a letter loser!!",
                validate: function(value) {
                    if(isLetter(value)){
                        return true;
                    } else{
                        return false;
                    }
                }
            }]).then(function(ltr) {
                //toLpperCase because words in word bank are all lower
                var letterReturned = (ltr.chosenLtr).toLowerCase();
                //adds to the guessedLetters array if it isn't already there
                var guessedAlready = false;
                for(var i = 0; i<that.guessedLetters.length; i++){
                    if(letterReturned === that.guessedLetters[i]){
                        guessedAlready = true;
                    }
                }
                //if the letter wasn't guessed already run through entire function, else reprompt user
                if(guessedAlready === false){
                    that.guessedLetters.push(letterReturned);

                    var found = that.currentWord.isletterfound(letterReturned);
                    //if none were found tell user they were wrong
                    if(found === 0){
                        console.log('Nope! You guessed wrong loser!!');
                        that.guessesRemaining--;
                        that.display++;
                        console.log('Guesses remaining: ' + that.guessesRemaining);

                        console.log('\n*******************');
                        console.log(that.currentWord.wordRender());
                        console.log('\n*******************');

                        console.log("Letters guessed: " + that.guessedLetters);
                    } else{
                        console.log('Yes! You guessed right, still a loser!');
                        //checks to see if user won
                        if(that.currentWord.iswordfound() === true){
                            console.log(that.currentWord.wordRender());
                            console.log('Congratulations! You won the game, whatever loser!!!');
                            // that.startGame();
                        } else{
                            // display the user how many guesses remaining
                            console.log('Guesses remaining: ' + that.guessesRemaining);
                            console.log(that.currentWord.wordRender());
                            console.log('\n*******************');
                            console.log("Letters guessed: " + that.guessedLetters);
                        }
                    }
                    if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
                        that.keepPromptingUser();
                    }else if(that.guessesRemaining === 0){
                        console.log('Game over!');
                        console.log('The word you were guessing was: ' + that.currentWord.word);
                    }
                } else{
                    console.log("You've guessed that letter already. Try again.")
                    that.keepPromptingUser();
                }
            });
        }
    }
    
}

    Hangman.startGame();




