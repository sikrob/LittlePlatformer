// LittlePlatformer.js

// This file contains the main gameloop and any intializations that it doesn't make sense to put somewhere else.
// Initializations include: canvas

var createCanvas = function() {
	var canvas = document.createElement("canvas");
	var canvasContext = canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 600;
	document.getElementById('gamebox').appendChild(canvas);
	return canvasContext;
};

var LittlePlatformer = function() {
	var canvasContext = createCanvas();
	var curState = new MenustateClass();

	while(true) {
		//curState.input();
		//curState.update();
		//curState.render(canvasContext);

		if (curState.newState != "") {
			if (curState.newState == "play") {
				curState = null;
				curState = new PlaystateClass();
			} else if (curState.newState == "menu") {
				curState = null;
				curState = new MenustateClass();
			}
		}

		break;
	}
};