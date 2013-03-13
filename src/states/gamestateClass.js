// GamestateClass.js

// I'm not sure we need this at all; it makes it feel a little more like C++, albeit not by much,
// and that's familiar but I may drop this class later if I never end up looking for "GamestateClass"
// as an identifier for anything.

// Probably should read a book on game design or something at some point.

function GamestateClass() {
	this.stateName = "gsc";
	this.newState = "";
};

GamestateClass.prototype.update = function (keysDown) {
};

GamestateClass.prototype.render = function (canvasContext) {
};