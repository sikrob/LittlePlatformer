// MenustateClass.js

MenustateClass.prototype = new GamestateClass();
MenustateClass.prototype.constructor = MenustateClass;
function MenustateClass() {
	this.userInput = "";
	this.selectedOption = 1; // 1=PLAY 2=NOPE

	// arrow info
	this.arrowFont = "36px Helvetica";
	this.arrowFillStyle = "#fff";
	this.arrowStrokeStyle = "#000";
	this.arrowX = 300;
	this.arrowY = 310;
};

MenustateClass.prototype.update = function (keysDown) {
	this.userInput = "";

	if (getConstant("SPACEBAR") in keysDown || getConstant("ENTER") in keysDown) {
		this.userInput = this.userInput + "SELECT";
	}

	if (getConstant("W") in keysDown || getConstant("UP") in keysDown || getConstant("S") in keysDown || getConstant("DOWN") in keysDown) {
		this.userInput = this.userInput + "FLIP";
		if (this.selectedOption == 1) {
			this.selectedOption = 2;
		} else {
			this.selectedOption = 1;
		}
	}

	if (this.selectedOption == 1) {
		this.arrowY = 310;
	} else if (this.selectedOption == 2) {
		this.arrowY = 350;
	}
};

MenustateClass.prototype.render = function (canvasContext) {
	var oldFont = canvasContext.font;

	canvasContext.fillStyle = "#acf";
	canvasContext.fillRect(0,0,800,600);

	canvasContext.fillStyle = "#fff";
	canvasContext.strokeStyle = "#000";
	canvasContext.font = "72px Helvetica";
	canvasContext.fillText("Little Platformer", 140, 100);
	canvasContext.strokeText("Little Platformer", 140, 100);
	canvasContext.font = "27px Helvetica";
	canvasContext.fillText("A simple HTML5 game by Robert Sikorski.", 140, 140);
	canvasContext.font = "10px Helvetica";
	canvasContext.fillText("Copyright 2013; see LICENSE.MD at www.github.com/sikrob/LittlePlatformer for details.", 190, 580);

	canvasContext.font = "36px Helvetica";
	canvasContext.fillText("PLAY", 330, 310);
	canvasContext.strokeText("PLAY", 330, 310);
	canvasContext.fillText("NOPE", 330, 350);
	canvasContext.strokeText("NOPE", 330, 350);

	// DEBUG
	canvasContext.font = "10px Helvetica";
	canvasContext.fillText("DEBUG:" + this.userInput, 10, 500);

	// dynamic content here
	canvasContext.font = this.arrowFont;
	canvasContext.fillStyle = this.arrowFillStyle;
	canvasContext.strokeStyle = this.arrowStrokeStyle;
	canvasContext.fillText(">", this.arrowX, this.arrowY);
	canvasContext.strokeText(">", this.arrowX, this.arrowY);
	// /dynamic content

	canvasContext.strokeStyle = "#000";
	canvasContext.strokeRect(0,0,800,600);

	canvasContext.font = oldFont;
};