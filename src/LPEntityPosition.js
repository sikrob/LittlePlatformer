// LPEntityPosition.js
// Position object that gets used for any entity; includes current, new(temp), and velocity.
function LPEntityPosition() {
	"use strict";
	this.xCurrent = -1;
	this.yCurrent = -1;
	this.xNew = -1;
	this.yNew = -1;
	this.xVelocity = 0;
	this.yVelocity = 0;
}
