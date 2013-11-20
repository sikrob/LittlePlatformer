// LPGameStateController.js

// Little Platformer Game State Controller

function LPGameStateController() {
	"use strict";
	this.currentState = "";
}

LPGameStateController.prototype.addState = function (newState) { // In this context, "new" means a totally new state.
	"use strict";
	this[newState.stateName] = newState;
};

LPGameStateController.prototype.changeState = function(newState) {	// In this context, "new" only means a different state
																	// already contained in LPGSC.
	"use strict";
	this.currentState = newState;
};

LPGameStateController.prototype.update = function(keysDown) {
	"use strict";
	if (this[this.currentState].newState !== "") {
		var oldState = this.currentState;
		this.changeState(this[this.currentState].newState);
		this[oldState].newState = "";
		this[oldState].initialize();
	} else {
		this[this.currentState].update(keysDown);
	}
};

LPGameStateController.prototype.render = function(canvasContext) {
	"use strict";
	this[this.currentState].render(canvasContext);
};
