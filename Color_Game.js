//Set an object for the game
game = {};
//DOM tags selection
game["h1"] = document.querySelector("h1");
game["square"] = document.querySelectorAll(".square");
game["message"] = document.querySelector("#message");
game["rgb"] = document.querySelector("#rgb");
game["resetButton"] = document.querySelector("button");
game["modeButton"] = document.querySelectorAll(".mode");

//Set the default game mode to be hard
game["gameModeHard"] = true;

//Generate random numbers from 0 - 255
game.randomNum255 = function(){
	return Math.floor(256 * Math.random());
}

//Generate random numbers from 0 - 6 (or 3)
game.randomNum = function(){
	return Math.floor(game["color"].length * Math.random());
}

//Set all squares and header to the selected color
game.colorSync = function(){
	for(i = 0; i < game["numOfSquares"]; i++){
		game["square"][i].style.backgroundColor = game["picked"];
		game["h1"].style.backgroundColor = game["picked"];
	}
}

//Generate random colors in RGB format
game.colorGenerater = function(){
	arr = [];
	for(i = 0; i < game["numOfSquares"]; i++){
		//Construct the string in rgb format
		arrRgb = "rgb(" + game.randomNum255() + ", " + game.randomNum255() + ", " + game.randomNum255() + ")";
		arr.push(arrRgb);
	}
	return arr;
}

game.setNewGame = function(){
	if(game["gameModeHard"]){
		//Six squares for hard games
		game["numOfSquares"] = 6;
		//Reassign random colors to squares
		game.refreshColors();
	}

	else{
		//Three squares for easy games
		game["numOfSquares"] = 3;
		//Reassign random colors to easy squares
		game.refreshColors();
	}
}

//Reset all the colors back to default and set new colors array and picked color
game.refreshColors = function(){
	//Generate new random colors
	// game["numOfSquares"]
	game["color"] = game.colorGenerater();
	//Set new picked color
	game["picked"] = game["color"][game.randomNum()];
	//Reset text in header
	game["rgb"].textContent = game["picked"];
	//Reset the background color of header in case it changes when player wins
	game["h1"].style.backgroundColor = "steelblue";
	//Clear the message shown on the stripe
	game["message"].textContent = "";
	//Change the text on the button back to "New Colors"
	game["resetButton"].textContent = "New Colors"
	for(i = 0; i < game["numOfSquares"]; i++){
		game["square"][i].style.backgroundColor = game["color"][i];
	}
}

game.showOrHide = function(){
	for(i = 0; i < game["square"].length; i++){
		if(game["color"][i]){
			game["square"][i].style.display = "block";
		}
		else{
			game["square"][i].style.display = "none";
		}
	}
}

game.buttonSetup = function(){
	//Set a new game with six new squares
	game.setNewGame();
	//Show the second row of squares for hard mode
	game.showOrHide();
	//Set the hard button to be selected
	game["modeButton"][0].classList.remove("selected");
	game["modeButton"][1].classList.remove("selected");
}

//Loop through the list of squares
game.init = function(){
	for(i = 0; i < game["numOfSquares"]; i++){
		//Assign random colors to squares
		game["square"][i].style.backgroundColor = game["color"][i];
		//The square fades out when clicked
		game["square"][i].addEventListener("click", function(){
			if(this.style.backgroundColor != game["picked"]){
				//Show a message when player chooses the wrong square
				game["message"].textContent = "Try again";
				this.style.background = "#232323";
			}

			else{
				//Show a message when player chooses the correct square
				game["message"].textContent = "Correct!";
				//Change the text on the button once player wins
				game["resetButton"].textContent = "Play again?"
				//Change the color of squares and header when player wins
				game.colorSync();
			}
		});
	}
}

//Initialize the game
game.setNewGame();
game.init();

//Reset game when the reset button is clicked
game["resetButton"].addEventListener("click", game.setNewGame);

//Set the mode buttons
for(i = 0; i < game["modeButton"].length; i++){
	game["modeButton"][i].addEventListener("click", function(){
		if(this.textContent == "Easy"){
			game["gameModeHard"] = false;
			game.buttonSetup();
			this.classList.add("selected");
		}
		else{
			game["gameModeHard"] = true;
			game.buttonSetup();
			this.classList.add("selected");
		}
	});
}