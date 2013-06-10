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
	this.playerVelocityXMod = 1;
	this.inertiaMod = 5;
	this.playerVelocityJumpMod = 10;
	this.gravityVelocityMod = 5;
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
	}
	if (getConstant("W") in keysDown || getConstant("UP") in keysDown) {
		//tempYVelocity 
	}
	if (getConstant("D") in keysDown || getConstant("RIGHT") in keysDown) {
		tempXVelocity += this.playerVelocityXMod;
	}

	if (!(getConstant("D") in keysDown) && !(getConstant("RIGHT") in keysDown) && !(getConstant("A") in keysDown) && !(getConstant("LEFT") in keysDown)) {
		tempXVelocity = 0;
	}
	// temp new osition
	
	// get tilestate of temppos
	// if tilestate = nogo
	// 	put on edge of tile
	// if tilestate = end
	//  end
	// else
	//  pos=newpos
	this.player.xVelocity = tempXVelocity;

	// POSITION
	this.player.setPosition(this.player.xPosition + this.player.xVelocity, this.player.yPosition);
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