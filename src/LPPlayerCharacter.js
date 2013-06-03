// LPPlayerCharacter.js
// Hold player data, including position, state(?), image
function LPPlayerCharacter() {
	// graphic
	this.xPosition = -1;
	this.yPosition = -1;
};

LPPlayerCharacter.prototype.setPosition = function(xNew, yNew) {
	this.xPosition = xNew;
	this.yPosition = yNew;
};

LPPlayerCharacter.prototype.render = function(canvasContext) {
	canvasContext.fillStyle = "#00F";
	canvasContext.fillRect(this.xPosition, this.yPosition, 32, 32);
};