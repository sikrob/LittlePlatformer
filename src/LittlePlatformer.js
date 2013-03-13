// LittlePlatformer.js

// This file contains the main gameloop and any intializations that it doesn't make sense to put somewhere else.

var createCanvas = function() {
	var canvas = document.createElement("canvas");
	var canvasContext = canvas.getContext("2d");
	canvas.width = 800;
	canvas.height = 600;
	document.getElementById('gamebox').appendChild(canvas);
	return canvasContext;
};

var LittlePlatformerGameLoop = function(canvasContext, LPGSC, keysDown) { // LPGSC - LPGameStateController
	LPGSC.update(keysDown);
	LPGSC.render(canvasContext);
}

var LittlePlatformer = function() {
	var canvasContext = createCanvas();
	canvasContext.font = "10px Helvetica";
	canvasContext.fillText("Canvas created; context obtained!", 10, 10);

	var keysDown = {};
	window.addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);
	window.addEventListener("keyup", function (e) {
		if (e.keyCode in keysDown) {
			delete keysDown[e.keyCode];
		}
	}, false);
	canvasContext.fillText("listeners initialized!", 10, 20);

	var LPGSC = new LPGameStateController();
	LPGSC.addState(new MenustateClass());
	LPGSC.addState(new PlaystateClass());
	LPGSC.changeState("menu"); // Set initial menu state outside of the loop but after states have been actually added.
	canvasContext.fillText("State system initilized!", 10, 30);

	// Pass in with anonymous function because otherwise it sets the code to execute as the
	// result of LittlePlatformerGameLoop, which is null.
	setInterval(function() {LittlePlatformerGameLoop(canvasContext, LPGSC, keysDown)}, 17);
};