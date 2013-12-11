// PlaystateClass.js
function PlaystateClass() {
	"use strict";
	this.stateName = "play";

	this.listed = false;
	this.mapList = new LPMapList();

	this.tiled = false;
	this.tiledMap = new LPTiledMap();
	this.tiledMapOffsets = new LPTiledMapOffsets();
	this.tiledMapOffsets.curOffsetX = -1;
	this.tiledMapOffsets.curOffsetY = -1;
	this.tiledMapOffsets.oldOffsetX = -1;
	this.tiledMapOffsets.oldOffsetY = -1;

//	this.mapOffsetX = -1;
//	this.mapOffsetY = -1;
//	this.oldOffsetX = -1;
//	this.oldOffsetY = -1;

	this.mapOffsetSet = false;
	this.initialized = false;
	this.completed = false;

	this.userInput = "";

	this.player = new LPPlayerCharacter();
	this.playerVelocityXMod = 2;
	this.inertiaMod = 5;
	this.playerVelocityJumpMod = 4;
	this.gravityVelocityMod = 0.1;
	this.terminalVelocity = 20;

	this.playerPosLimitLeft = 150;
	this.playerPosLimitRight = 650;

	this.jumpSnd = new Audio("res/snd/jump_02.ogg");
	this.prevTime = new Date().getTime();
}
PlaystateClass.prototype = new GamestateClass();
PlaystateClass.prototype.constructor = PlaystateClass;

PlaystateClass.prototype.initialize = function () {
	"use strict";
	this.listed = false;
	this.mapList = new LPMapList();

	this.tiled = false;
	this.tiledMap = new LPTiledMap();

	this.tiledMapOffsets.curOffsetX = -1;
	this.tiledMapOffsets.curOffsetY = -1;
	this.tiledMapOffsets.oldOffsetX = -1;
	this.tiledMapOffsets.oldOffsetY = -1;

//	this.mapOffsetX = -1;
//	this.mapOffsetY = -1;
//	this.oldOffsetX = -1;
//	this.oldOffsetY = -1;

	this.mapOffsetSet = false;
	this.initialized = false;
	this.completed = false;

	this.userInput = "";

	this.newState = "";
}

PlaystateClass.prototype.update = function (keysDown) {
	"use strict";
	if (this.newState != "") {
		this.initialize();
	}

	var deltaTime = new Date().getTime() - this.prevTime;
	if (!this.initialized) {
		if (!this.listed) {
			this.mapList.loadMapList("maplist");
			this.listed = true;
		}

		if (this.listed && this.mapList.mapListLoaded && !this.tiled) {
			this.tiledMap.loadMap(this.mapList.mapList[this.mapList.currentMapIndex++]);
			this.tiled = true;
		}

		if (this.tiled && this.tiledMap.mapLoaded) {
			if (this.tiledMap.mapPXHeight < 600) {
				this.tiledMapOffsets.curOffsetY = (600 - this.tiledMap.mapPXHeight)/2;
//				this.mapOffsetY = (600 - this.tiledMap.mapPXHeight)/2;
			} else {
				this.tiledMapOffsets.curOffsetY = 0;
			}
			if (this.tiledMap.mapPXWidth < 800) {
				this.tiledMapOffsets.curOffsetX = (800 - this.tiledMap.mapPXWidth)/2;
//				this.mapOffsetX = (800 - this.tiledMap.mapPXWidth)/2;
			} else {
				this.tiledMapOffsets.curOffsetX = 0;
			}

			this.mapOffsetSet = true;
		}

		if (this.mapOffsetSet) {
			this.player.setPosition(this.tiledMap.startX + this.tiledMapOffsets.curOffsetX, this.tiledMap.startY + this.tiledMapOffsets.curOffsetY - 32);
			this.initialized = true;
		}
	} else {
		if (!this.completed) {
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
				if (!this.player.jumping) {
					this.jumpSnd.play();
					tempYVelocity = -this.playerVelocityJumpMod;
					this.player.jumping = true;
				}
			}

			// no motion on S/DOWN

			if (!(getConstant("D") in keysDown) && !(getConstant("RIGHT") in keysDown) && !(getConstant("A") in keysDown) && !(getConstant("LEFT") in keysDown)) {
				tempXVelocity = 0;
			}

			tempYVelocity += this.gravityVelocityMod;
			tempXVelocity *= deltaTime/5;

			if (tempYVelocity > this.terminalVelocity) {
				tempYVelocity = this.terminalVelocity;
			}

			this.player.yVelocity = tempYVelocity;
			var tempXPos = this.player.xPosition + tempXVelocity;
			var tempYPos = this.player.yPosition + tempYVelocity;

			// sketching out canvas movement...
			// currnetly this breaks collision detection if it happens while mapoffset adjusts
			// - maybe need to mix the new offset w/ old pos (xCur) to ensure proper calcs...
			// I believe it breaks due to early check against just pPos and not mOffset
			if (tempXPos > this.playerPosLimitRight) {
				this.tiledMapOffsets.oldOffsetX = this.tiledMapOffsets.curOffsetX;
//				this.oldOffsetX = this.mapOffsetX;
				this.tiledMapOffsets.curOffsetX -=  tempXPos-this.playerPosLimitRight;
//				this.mapOffsetX -= tempXPos-this.playerPosLimitRight;
				tempXPos = this.playerPosLimitRight;
			} else if (tempXPos < this.playerPosLimitLeft) {
				this.tiledMapOffsets.oldOffsetX = this.tiledMapOffsets.curOffsetX;
//				this.oldOffsetX = this.mapOffsetX;
				this.tiledMapOffsets.curOffsetX -= tempXPos-this.playerPosLimitLeft;
//				this.mapOffsetX -= tempXPos-this.playerPosLimitLeft;
				tempXPos = this.playerPosLimitLeft;
			}

			this.player.position.xNew = tempXPos;
			this.player.position.yNew = tempYPos;
			this.player.position.xCurrent = this.player.xPosition;
			this.player.position.yCurrent = this.player.yPosition;

			this.tiledMap.resolveCollision(this.player.position, this.tiledMapOffsets);

			if (this.player.position.yCurrent != tempYPos) {
				if (this.player.position.yCurrent < tempYPos) {
					this.player.jumping = false;
				}
				this.player.yVelocity = 0;
			}

			this.player.setPosition(this.player.position.xCurrent, this.player.position.yCurrent);

			if (this.initialized &&
				(this.player.position.xCurrent == (this.tiledMap.endX+this.tiledMapOffsets.curOffsetX)) &&
				(this.player.position.yCurrent == (this.tiledMap.endY+this.tiledMapOffsets.curOffsetY-32))) {
				this.completed = true;
			}
		} else { // level complete logic
			if (getConstant("SPACEBAR") in keysDown) {
				if (this.mapList.currentMapIndex == this.mapList.mapList.length) {
					this.newState = "menu";
					this.initialized = false;
					this.tiled = false;
					this.mapOffsetSet = false;
					this.completed = false;
					if (getConstant("SPACEBAR") in keysDown) {
						delete keysDown[getConstant("SPACEBAR")];
					}
					if (getConstant("ENTER") in keysDown) {
						delete keysDown[getConstant("ENTER")]
					}
				} else {
					this.initialized = false;
					this.tiled = false;
					this.mapOffsetSet = false;
					this.completed = false;
				}
			}
		}
	}

	this.prevTime = new Date().getTime();
};

PlaystateClass.prototype.render = function (canvasContext) {
	"use strict";
	var oldFont = canvasContext.font;

	canvasContext.fillStyle = "#5fa";
	canvasContext.fillRect(0,0,800,600);

	canvasContext.font = oldFont;

	if (this.initialized) {
		if (!this.completed) {
			this.tiledMap.renderMap(canvasContext, this.tiledMapOffsets.curOffsetX, this.tiledMapOffsets.curOffsetY);
			this.player.render(canvasContext);
		} else {
			// end level screen
			canvasContext.fillStyle = "#000";
			canvasContext.fillRect(0,0,800,600);
			canvasContext.fillStyle = "#fff";
			canvasContext.font = "27px Helvetica";
			canvasContext.fillText("Level complete!", 312, 250);
		}
	}
};
