// PlaystateClass.js

PlaystateClass.prototype = new GamestateClass();
PlaystateClass.prototype.constructor = PlaystateClass;
function PlaystateClass() {
	this.stateName = "play";

	this.tiled = false;
	this.tiledMap = new LPTiledMap();
	this.mapOffsetX = -1;
	this.mapOffsetY = -1;
	this.initialized = false;

	this.userInput = "";

	this.player = new LPPlayerCharacter();
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

			this.initialized = true;
		}
	}

	// grab user input 
	if (getConstant("A") in keysDown || getConstant("LEFT") in keysDown) {
		
	}
	if (getConstant("W") in keysDown || getConstant("UP") in keysDown) {

	}
	if (getConstant("D") in keysDown || getConstant("RIGHT") in keysDown) {

	}
	// temp new osition
	
	// get tilestate of temppos
	// if tilestate = nogo
	// 	put on edge of tile
	// if tilestate = end
	//  end
	// else
	//  pos=newpos
};

PlaystateClass.prototype.render = function (canvasContext) {
	var oldFont = canvasContext.font;

	canvasContext.fillStyle = "#5fa";
	canvasContext.fillRect(0,0,800,600);

	canvasContext.font = oldFont;

	if (this.initialized) {
		this.tiledMap.renderMap(canvasContext, this.mapOffsetX, this.mapOffsetY);

	}
};