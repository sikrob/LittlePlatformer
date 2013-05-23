// PlaystateClass.js

PlaystateClass.prototype = new GamestateClass();
PlaystateClass.prototype.constructor = PlaystateClass;
function PlaystateClass() {
	this.stateName = "play";
	this.tiled = false;
	this.tiledMap = new LPTiledMap();
	this.finalizedMap = false;
	this.mapOffsetX = -1;
	this.mapOffsetY = -1;
};

PlaystateClass.prototype.update = function (keysDown) {
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
		this.finalizedMap = true; // find a better way to handle offsets in the future, right now we expect NO MAP SCROLL.
	}

	// is the level loaded?
		// including loading: XML, player, graphics, and hopefully sound eventually.
	// if yes, what all do we track? Right now just the player coordinates and the map coordinates, I think.
};

PlaystateClass.prototype.render = function (canvasContext) {
	var oldFont = canvasContext.font;

	canvasContext.fillStyle = "#5fa";
	canvasContext.fillRect(0,0,800,600);

	canvasContext.font = oldFont;

	if (this.tiled) {
		this.tiledMap.renderMap(canvasContext, this.mapOffsetX, this.mapOffsetY);
	}
};
