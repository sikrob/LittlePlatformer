// MenustateClass.js

MenustateClass.prototype = new GamestateClass();
MenustateClass.prototype.constructor = MenustateClass;
function MenustateClass() {
	this.userInput = "";
};

MenustateClass.prototype.getInput = function (keysDown) {
	if (getConstant("SPACEBAR") in keysDown) {
	}
};

MenustateClass.prototype.update = function () {

};

MenustateClass.prototype.render = function (canvasContext) {
	var oldFont = canvasContext.font;

	canvasContext.fillStyle = "#acf";
	canvasContext.fillRect(0,0,800,600);

	canvasContext.fillStyle = "#fff";
	canvasContext.strokeStyle = "black";
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


	// dynamic content here

	// /dynamic content

	canvasContext.strokeStyle = "black";
	canvasContext.strokeRect(0,0,800,600);

	canvasContext.font = oldFont;
};