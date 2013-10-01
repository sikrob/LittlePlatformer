// LPGameStateController.js

// Little Platformer Game State Controller

function LPGameStateController() {
	this.currentState = "";
}

LPGameStateController.prototype.addState = function (newState) { // In this context, "new" means a totally new state.
	this[newState.stateName] = newState;
};

LPGameStateController.prototype.changeState = function(newState) {	// In this context, "new" only means a different state
																	// already contained in LPGSC.
	this.currentState = newState;
};

LPGameStateController.prototype.update = function(keysDown) {
	this[this.currentState].update(keysDown);
	if (this[this.currentState].newState !== "") {
		this.changeState(this[this.currentState].newState);
	}
};

LPGameStateController.prototype.render = function(canvasContext) {
	this[this.currentState].render(canvasContext);
};
