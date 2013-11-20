// LPPlayerCharacter.js
// Hold player data, including position, state(?), image
function LPPlayerCharacter() {
	"use strict";
	// graphic
	this.xPosition = -1;
	this.yPosition = -1;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.jumping = false;

	this.xMaxVelocity = 5;

	this.position = new LPEntityPosition();
}

LPPlayerCharacter.prototype.setPosition = function(xNew, yNew) {
	"use strict";
	this.xPosition = xNew;
	this.yPosition = yNew;
};

LPPlayerCharacter.prototype.setVelocity = function(xNew, yNew) {
	"use strict";
	this.xVelocity = xNew;
	this.yVelocity = yNew;
};

LPPlayerCharacter.prototype.render = function(canvasContext) {
	"use strict";
	canvasContext.fillStyle = "#00F";
	canvasContext.fillRect(this.position.xCurrent, this.position.yCurrent, 32, 32);
};
