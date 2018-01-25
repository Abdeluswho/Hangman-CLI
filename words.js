var letter = require("./letter.js");

var Word = function(wrd){
	this.word = wrd;
	this.lets = [];
	this.found = false;
	this.getLets = function(word){
		for (var i = 0; i < this.word.length; i++) {
			this.lets.push(new letter.Letter(this.word[i]));
		}
	};
	
	this.didWeFindWord = function(){
		var count = 0;
		for (var i = 0; i < this.lets.length; i++) {
			if (this.lets[i].appear){
				count++;
			}
		}
		if (count === this.lets.length){
			this.found = true;
		}
		return this.found;
	};
	
	this.checkIfLetterFound = function(guessLetter){
		var whatToReturn = 0;
		for (var i = 0; i < this.lets.length; i++) {
			if(this.lets[i].charac === guessLetter){
				this.lets[i].appear = true;
				whatToReturn++;
			}
		}
		return whatToReturn;
	};

	this.wordRender = function(){
		var str = "";
		for (var i = 0; i < this.lets.length; i++) {
			str += this.lets[i].letterRender();
		}
		return str;
	};

};

exports.Word = Word;