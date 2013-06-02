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
}

LPPlayerCharacter.prototype.render = function(canvasContext) {

}