let Letter = require("./letter.js");



let underscore='';


class Word{
	constructor(word){
		let that = this;

		this.word = word;
		this.letters = [];
		this.wordFound = false;

	}
//saves the letters and displays the underscors
	getletters(){
		for (var i = 0; i < that.word.length; i++) {
			let newletter = new Letter(that.word[i]);
			this.letters.push(newletter);
			
			underscore += ' _ ';

		}
		console.log(underscore);
	}
	//check if the letter is correct

	isletterfound(){
		let found = false;

		this.letters.forEach(function (ltr) {
			// body...
			if (ltr.letter === guessedletter) {
				ltr.appear = true;
				found = true;
			}
		})
		return found;
	}
//right if the word is guessed
	iswordfound(){
		if (this.letters.every(function (ltr) {
			// body...
			return ltr.appear === true;

		})) {
			this.wordFound = true;
			return true
		}
	};

	wordrender(){
		let display = '';
		that.letters.forEach(function (ltr) {
			// body...
			let currentLetter = ltr.letterRender();
			display += currentLetter;
		});
		return display;
	};
}


module.exports = Word;


