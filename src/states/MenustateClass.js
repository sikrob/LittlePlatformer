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
	canvasContext.fillText("Menustate render check", 10, 40);
};