// PlaystateClass.js

PlaystateClass.prototype = new GamestateClass();
PlaystateClass.prototype.constructor = PlaystateClass;
function PlaystateClass() {
	this.stateName = "play";
	this.tiled = false;
	this.tiledMap = new LPTiledMap();
};

PlaystateClass.prototype.update = function (keysDown) {
	if (!this.tiled) {
		this.tiledMap.loadMap("test.xml");
		this.tiled = true;
	}
	// is the level loaded?
		// including loading: XML, player, graphics, and hopefully sound eventually.
	// if yes, what all do we track? Right now just the player coordinates and the map coordinates, I think.

	/*

0	-
1	-
2	-
3	-
4	-
5	-x
6	--
7	--

	*/
};

PlaystateClass.prototype.render = function (canvasContext) {
	var oldFont = canvasContext.font;

	canvasContext.fillStyle = "#5fa";
	canvasContext.fillRect(0,0,800,600);

	canvasContext.font = oldFont;
};