// MenustateClass.js
function MenustateClass() {
	"use strict";
	this.stateName = "menu";

	this.userInput = "";
	this.selectedOption = 1; // 1=PLAY 2=ABOUT
	this.showAboutText = false;

	// arrow info
	this.arrowFont = "36px Helvetica";
	this.arrowFillStyle = "#fff";
	this.arrowStrokeStyle = "#000";
	this.arrowX = 300;
	this.arrowY = 310;
}

MenustateClass.prototype = new GamestateClass();
MenustateClass.prototype.constructor = MenustateClass;

MenustateClass.prototype.initialize = function () {
	"use strict";
	this.userInput = "";
	this.selectedOption = 1;
	this.showAboutText = false;
	this.newState = "";
};

MenustateClass.prototype.update = function (keysDown) {
	"use strict";
	this.userInput = "";

	if (this.newState != "") {
		this.initialize();
	}

	if (getConstant("SPACEBAR") in keysDown || getConstant("ENTER") in keysDown) {
		this.userInput = this.userInput + "SELECT";
		if (this.selectedOption == 1) {
			this.newState = "play";
			if (getConstant("SPACEBAR") in keysDown) {
				delete keysDown[getConstant("SPACEBAR")];
			}
			if (getConstant("ENTER") in keysDown) {
				delete keysDown[getConstant("ENTER")]
			}
		} else if (this.selectedOption == 2) {
			this.showAboutText = true;
		}
	} else {
		this.showAboutText = false;
	}

	if (getConstant("W") in keysDown || getConstant("UP") in keysDown || getConstant("S") in keysDown || getConstant("DOWN") in keysDown) {
		this.userInput = this.userInput + "FLIP";
		if (this.selectedOption == 1) {
			this.selectedOption = 2;
		} else {
			this.selectedOption = 1;
		}

		// May wrap this up in a function for just removing all bits for ease.
		// Or maybe an array of possible functions that gets passed in, but that
		// might defeat the purpose if we need to still manually assign the array.
		if (getConstant("W") in keysDown) {
			delete keysDown[getConstant("W")];
		} else if (getConstant("UP") in keysDown) {
			delete keysDown[getConstant("UP")];
		} else if (getConstant("S") in keysDown) {
			delete keysDown[getConstant("S")];
		} else if (getConstant("DOWN") in keysDown) {
			delete keysDown[getConstant("DOWN")];
		}
	}

	if (this.selectedOption == 1) {
		this.arrowY = 310;
	} else if (this.selectedOption == 2) {
		this.arrowY = 350;
	}
};

MenustateClass.prototype.render = function (canvasContext) {
	"use strict";
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
	canvasContext.fillText("Version 1", 190, 565);
	canvasContext.font = "10px Helvetica";
	canvasContext.fillText("Copyright 2013; see LICENSE.MD at www.github.com/sikrob/LittlePlatformer for details.", 190, 580);

	canvasContext.font = "36px Helvetica";
	canvasContext.fillText("PLAY", 330, 310);
	canvasContext.strokeText("PLAY", 330, 310);
	canvasContext.fillText("ABOUT", 330, 350);
	canvasContext.strokeText("ABOUT", 330, 350);

	// dynamic content here
	canvasContext.font = this.arrowFont;
	canvasContext.fillStyle = this.arrowFillStyle;
	canvasContext.strokeStyle = this.arrowStrokeStyle;
	canvasContext.fillText(">", this.arrowX, this.arrowY);
	canvasContext.strokeText(">", this.arrowX, this.arrowY);

	if (this.showAboutText) {
		canvasContext.font = "18px Helvetica";
		canvasContext.fillText("Little Platformer is a barebones platforming game written in javascript.",120,450);
		canvasContext.font = "16px Helvetica";
		canvasContext.fillText("It was created in response to onegameamonth.com and used a free sound asset",120,480);
		canvasContext.fillText("from dklon via opengameart.org.",120,500);
		canvasContext.font = "12px Helvetica";
		canvasContext.fillText("Credit to the people on github who helped out, too.", 120, 520);
	}
	// /dynamic content

	canvasContext.strokeStyle = "#000";
	canvasContext.strokeRect(0,0,800,600);

	canvasContext.font = oldFont;
};
