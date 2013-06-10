// LPPlayerCharacter.js
// Hold player data, including position, state(?), image
function LPPlayerCharacter() {
	// graphic
	this.xPosition = -1;
	this.yPosition = -1;
	this.xVelocity = 0;
	this.yVelocity = 0;
	this.jumping = false;
};

LPPlayerCharacter.prototype.setPosition = function(xNew, yNew) {
	this.xPosition = xNew;
	this.yPosition = yNew;
};

LPPlayerCharacter.prototype.setVelocity = function(xNew, yNew) {
	this.xVelocity = xNew;
	this.yVelocity = yNew;
}

LPPlayerCharacter.prototype.render = function(canvasContext) {
	canvasContext.fillStyle = "#00F";
	canvasContext.fillRect(this.xPosition, this.yPosition, 32, 32);
};