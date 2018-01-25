var Letter = function(char){
	this.charac = char.toLowerCase();
	//starts off without appearing
	this.appear = false;
	//show the letters
	this.letterRender = function(){
		if(this.appear){
			return this.charac;
		} else if (this.charac === " "){
			this.appear = true;
			return this.charac;
		} else {
			return "_ ";
		}
	};
};

exports.Letter = Letter;