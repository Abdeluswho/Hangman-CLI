class Letter {
	constructor(letter){
		this.letter = letter,
		this.appear = false

	}

	letterRender (){
		if (this.appear === false) {
			return ' _ ';
		}else{
			return (this.letter);
		}
	};
};


module.exports = Letter;