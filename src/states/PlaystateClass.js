// PlaystateClass.js
function PlaystateClass() {
	this.stateName = "play";

	this.tiled = false;
	this.tiledMap = new LPTiledMap();
	this.mapOffsetX = -1;
	this.mapOffsetY = -1;
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

	this.jumpSnd = new Audio("res/snd/jump_02.ogg");
	this.prevTime = new Date().getTime();
}
PlaystateClass.prototype = new GamestateClass();
PlaystateClass.prototype.constructor = PlaystateClass;

PlaystateClass.prototype.update = function (keysDown) {
	var deltaTime = new Date().getTime() - this.prevTime;
	if (!this.initialized) {
		if (!this.tiled) {
			this.tiledMap.loadMap("1");
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

			this.player.position.xNew = tempXPos;
			this.player.position.yNew = tempYPos;
			this.player.position.xCurrent = this.player.xPosition;
			this.player.position.yCurrent = this.player.yPosition;

			this.tiledMap.resolveCollision(this.player.position, this.mapOffsetX, this.mapOffsetY);	

			if (this.player.position.yCurrent != tempYPos) {
				if (this.player.position.yCurrent < tempYPos) {
					this.player.jumping = false;
				}
				this.player.yVelocity = 0;
			} 

			this.player.setPosition(this.player.position.xCurrent, this.player.position.yCurrent);

			if (this.initialized &&
				(this.player.position.xCurrent == (this.tiledMap.endX+this.mapOffsetX)) &&
				(this.player.position.yCurrent == (this.tiledMap.endY+this.mapOffsetY-32))) {
				this.completed = true;
			}
		} else { // level complete logic
			if (getConstant("SPACEBAR") in keysDown) {
				// once spacebar is pressed:

				//	seek new level to load

				// two ways to do level loading:
				// have a list loaded so that we can load by name
				// or just continue with the sequential number thing and do load "level+1" until no map is found

				//	if level found
				//		load level
				//	else
				//		go to menu
			}
		}
	}

	this.prevTime = new Date().getTime();
};

PlaystateClass.prototype.render = function (canvasContext) {
	var oldFont = canvasContext.font;

	canvasContext.fillStyle = "#5fa";
	canvasContext.fillRect(0,0,800,600);

	canvasContext.font = oldFont;

	if (this.initialized) {
		if (!this.completed) {
			this.tiledMap.renderMap(canvasContext, this.mapOffsetX, this.mapOffsetY);
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
