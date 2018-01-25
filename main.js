var prompt = require('prompt');
var Word = require("./words.js");
var Game = require("./game.js");
var isLetter = require('is-letter');

prompt.start();

var hangman = {
    wordBank: Game.wordBank,
    roundsWon: 0,
    guessesRemaining: 8,
    guessedLetters: [],
    currentWrd: null,
    startGame: function(wrd){
        this.resetGuessesRemaining();
        this.currentWrd = new Word.Word(this.wordBank[Math.floor(Math.random() * this.wordBank.length)]);
        this.currentWrd.getLets();
        console.log("Welcome to NBA Hangman!\nGuess from the 30 NBA teams!");
        console.log(this.currentWrd.wordRender() + '\n');
        this.keepPromptingUser();
    },
    resetGuessesRemaining: function(){
        this.guessRemaining = 8;
    },
    keepPromptingUser: function(){
        var self = this;
        prompt.get(['guessLetter'],function(err, result){
            console.log("");
            console.log('The letter you guessed is: ' + result.guessLetter);
            var findHowManyUserGuess = self.currentWrd.checkIfLetterFound(result.guessLetter);
            if(findHowManyUserGuess === 0){
                if (self.guessedLetters.indexOf(result.guessLetter) < 0){
                    self.guessedLetters.push(result.guessLetter);
                    self.guessesRemaining--;
                    console.log("You guessed a wrong letter!");
                } else {
                    console.log("You already guessed this letter!");
                }
            } else {
                if (self.guessedLetters.indexOf(result.guessLetter) < 0){
                    self.guessedLetters.push(result.guessLetter);
                    console.log("You guessed correct!");
                } else {
                    console.log("You already guessed that letter");
                }

                if(self.currentWrd.didWeFindWord()){
                    console.log("You win! The NBA team was " + self.currentWrd.word);
                    console.log("You're awesome!");
                    return;
                }
            }

            console.log("Guesses Remaining: ", self.guessesRemaining);
            console.log(self.currentWrd.wordRender());
            console.log("Letters already guessed: " + self.guessedLetters);

            if((self.guessesRemaining > 0) && (self.currentWrd.found === false)){
                self.keepPromptingUser();
            } else if (self.guessesRemaining === 0){
                console.log("You lose...The NBA team was: " + self.currentWrd.word);
            } else {
                console.log(self.currentWrd.wordRender());
            }
        });
    }
};

hangman.startGame()


// var inquirer = require('inquirer');
// var Word = require('./word.js');
// var Letter = require('./letter.js');
// var isLetter = require('is-letter');
// var Game = require('./game.js');

// var hangmanDisplay = Game.hangman;


// let Hangman = {
   
//     wordBank : Game.wordList,//random word??
//     guessesRemaining: 8,
//     //empty array to hold letters guessed by user. And checks if the user guessed the letter already
//     guessedLetters: [],
//     //index to display graphic
//     display: 0,
//     currentWord: '',
//     //welcomes user
//     startGame :  function () {
//         var that = this;
//         //clears guessedLetters before a new game starts if it's not already empty.
//         if(this.guessedLetters.length > 0){
//             this.guessedLetters = [];
//         }

//     inquirer.prompt([{
//         name: "play",
//         type: "confirm",
//         message: "Welcome.  Lets start playing loser!!"
//     }]).then(function(answer) {
    	
//     	newGame();
//         });

//       function resetGuessesRemaining() {
//                 this.guessesRemaining = 8;
//             }

//      function newGame() {
                
//                 if(that.guessesRemaining === 8) {

//                     var randNum = Math.floor(Math.random()*that.wordBank.length);
//                     that.currentWord = new Word(that.wordBank[randNum]);
//                     that.currentWord.getLetters();
//                     //displays current word as blanks.
//                     console.log(that.currentWord.wordRender());
//                     that.keepPromptingUser();
//                 } else{
//                     resetGuessesRemaining();
//                     newGame();
//                 }
//             }

       
       
//        function keepPromptingUser(){
//             var that = this;
//             //asks player for a letter
//             inquirer.prompt([{
//                 name: "chosenLtr",
//                 type: "input",
//                 message: "Choose a letter loser!!",
//                 validate: function(value) {
//                     if(isLetter(value)){
//                         return true;
//                     } else{
//                         return false;
//                     }
//                 }
//             }]).then(function(ltr) {
//                 //toLpperCase because words in word bank are all lower
//                 var letterReturned = (ltr.chosenLtr).toLowerCase();
//                 //adds to the guessedLetters array if it isn't already there
//                 var guessedAlready = false;
//                 for(var i = 0; i<that.guessedLetters.length; i++){
//                     if(letterReturned === that.guessedLetters[i]){
//                         guessedAlready = true;
//                     }
//                 }
//                 //if the letter wasn't guessed already run through entire function, else reprompt user
//                 if(guessedAlready === false){
//                     that.guessedLetters.push(letterReturned);

//                     var found = that.currentWord.isletterfound(letterReturned);
//                     //if none were found tell user they were wrong
//                     if(found === 0){
//                         console.log('Nope! You guessed wrong loser!!');
//                         that.guessesRemaining--;
//                         that.display++;
//                         console.log('Guesses remaining: ' + that.guessesRemaining);

//                         console.log('\n*******************');
//                         console.log(that.currentWord.wordRender());
//                         console.log('\n*******************');

//                         console.log("Letters guessed: " + that.guessedLetters);
//                     } else{
//                         console.log('Yes! You guessed right, still a loser!');
//                         //checks to see if user won
//                         if(that.currentWord.iswordfound() === true){
//                             console.log(that.currentWord.wordRender());
//                             console.log('Congratulations! You won the game, whatever loser!!!');
//                             // that.startGame();
//                         } else{
//                             // display the user how many guesses remaining
//                             console.log('Guesses remaining: ' + that.guessesRemaining);
//                             console.log(that.currentWord.wordRender());
//                             console.log('\n*******************');
//                             console.log("Letters guessed: " + that.guessedLetters);
//                         }
//                     }
//                     if(that.guessesRemaining > 0 && that.currentWord.wordFound === false) {
//                         that.keepPromptingUser();
//                     }else if(that.guessesRemaining === 0){
//                         console.log('Game over!');
//                         console.log('The word you were guessing was: ' + that.currentWord.word);
//                     }
//                 } else{
//                     console.log("You've guessed that letter already. Try again.")
//                     that.keepPromptingUser();
//                 }
//             });
//         }
//     }
    
// }

//     Hangman.startGame();




