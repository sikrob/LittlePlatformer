// PlaystateClass.js

PlaystateClass.prototype = new GamestateClass();
PlaystateClass.prototype.constructor = PlaystateClass;
function PlaystateClass() {
	this.stateName = "play";

	this.tiled = false;
	this.tiledMap = new LPTiledMap();
	this.mapOffsetX = -1;
	this.mapOffsetY = -1;
	this.mapOffsetSet = false;
	this.initialized = false;

	this.userInput = "";

	this.player = new LPPlayerCharacter();
	this.playerVelocityXMod = 2;//.1;
	this.inertiaMod = 5;
	this.playerVelocityJumpMod = 4;
	this.gravityVelocityMod = .05;
	this.terminalVelocity = 6;
};

PlaystateClass.prototype.update = function (keysDown) {
	if (!this.initialized) {
		if (!this.tiled) {
			this.tiledMap.loadMap("0");
			this.tiled = true;
		}

		if (this.tiled && this.tiledMap.mapLoaded) {
			if (this.tiledMap.mapPXHeight < 600) {
				this.mapOffsetY = (600 - this.tiledMap.mapPXHeight)/2;
			}
			if (this.tiledMap.mapPXWidth < 800) {
				this.mapOffsetX = (800 - this.tiledMap.mapPXWidth)/2;
			}

			this.mapOffsetSet = true;
		}

		if (this.mapOffsetSet) {
			this.player.setPosition(this.tiledMap.startX + this.mapOffsetX, this.tiledMap.startY + this.mapOffsetY - 32);
			this.initialized = true;
		}
	}

	var tempXVelocity = this.player.xVelocity;
	var tempYVelocity = this.player.yVelocity;

	if (getConstant("A") in keysDown || getConstant("LEFT") in keysDown) {
		tempXVelocity -= this.playerVelocityXMod;
		if (tempXVelocity < -this.player.xMaxVelocity) {
			tempXVelocity = -this.player.xMaxVelocity;
		}
	}
	if (getConstant("D") in keysDown || getConstant("RIGHT") in keysDown) {
		tempXVelocity += this.playerVelocityXMod;
		if (tempXVelocity > this.player.xMaxVelocity) {
			tempXVelocity = this.player.xMaxVelocity;
		}
	}

	if (getConstant("W") in keysDown || getConstant("UP") in keysDown) {
		//tempYVelocity 
		if (!this.player.jumping) {
			tempYVelocity = -this.playerVelocityJumpMod;
			this.player.jumping = true;
		}
	}

	// no motion on S/DOWN

	if (!(getConstant("D") in keysDown) && !(getConstant("RIGHT") in keysDown) && !(getConstant("A") in keysDown) && !(getConstant("LEFT") in keysDown)) {
		tempXVelocity = 0;
	}

	tempYVelocity += this.gravityVelocityMod;
	if (tempYVelocity > this.terminalVelocity) {
		tempYVelocity = this.terminalVelocity;
	}

	var tempXPos = this.player.xPosition + tempXVelocity;
	var tempYPos = this.player.yPosition + tempYVelocity;

	this.player.position.xNew = tempXPos;
	this.player.position.yNew = tempYPos;
	this.player.position.xCurrent = this.player.xPosition;
	this.player.position.yCurrent = this.player.yPosition;

	this.tiledMap.resolveCollision(this.player.position, this.mapOffsetX, this.mapOffsetY);	

	if (this.player.position.yCurrent != tempYPos) {
		this.player.jumping = false;
	}

	this.player.setPosition(this.player.position.xCurrent, this.player.position.yCurrent);
//	this.player.yVelocity = tempYVelocity;

};

PlaystateClass.prototype.render = function (canvasContext) {
	var oldFont = canvasContext.font;

	canvasContext.fillStyle = "#5fa";
	canvasContext.fillRect(0,0,800,600);

	canvasContext.font = oldFont;

	if (this.initialized) {
		this.tiledMap.renderMap(canvasContext, this.mapOffsetX, this.mapOffsetY);
		this.player.render(canvasContext);
	}
};