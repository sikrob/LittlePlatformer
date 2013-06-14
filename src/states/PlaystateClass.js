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
	this.playerVelocityXMod = .5;
	this.inertiaMod = 5;
	this.playerVelocityJumpMod = 4;
	this.gravityVelocityMod = 1;
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

	// VELOCITY
	// grab user input 
	var tempXVelocity = this.player.xVelocity;
	var tempYVelocity = this.player.yVelocity;

	if (getConstant("A") in keysDown || getConstant("LEFT") in keysDown) {
		tempXVelocity -= this.playerVelocityXMod;
		if (tempXVelocity < -this.player.xMaxVelocity) {
			tempXVelocity = -this.player.xMaxVelocity;
		}
	}
	if (getConstant("W") in keysDown || getConstant("UP") in keysDown) {
		//tempYVelocity 
		if (!this.player.jumping) {
			tempYVelocity = -this.playerVelocityJumpMod;
			this.player.jumping = true;
		}
	}
	if (getConstant("D") in keysDown || getConstant("RIGHT") in keysDown) {
		tempXVelocity += this.playerVelocityXMod;
		if (tempXVelocity > this.player.xMaxVelocity) {
			tempXVelocity = this.player.xMaxVelocity;
		}
	}

	if (!(getConstant("D") in keysDown) && !(getConstant("RIGHT") in keysDown) && !(getConstant("A") in keysDown) && !(getConstant("LEFT") in keysDown)) {
		tempXVelocity = 0;
	}

	// temp new position	
	// get tilestate of temppos
	// need for four points of new char state: x, y, x+32, y+32
	// get tile at (point): returns a "TILE" perhaps; this function will loop through the tiles and judge where they are on screen. Slow but quick to code.
	//

	// if tilestate = nogo
	// 	put on edge of tile
	// if tilestate = end
	//  end
	// else
	//  pos=newpos
	this.player.xVelocity = tempXVelocity;

	this.player.yVelocity = tempYVelocity;

	// POSITION
	this.player.setPosition(this.player.xPosition + this.player.xVelocity, this.player.yPosition + this.player.yVelocity);
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