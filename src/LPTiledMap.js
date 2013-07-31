// LPTiledMap
// A class for loading and containing map data from TiledMaps. We will look for certain specific attributes by default,
// however, so this may not be a great class since it won't be perfectly re-applicable for some projects.
function LPTiledMap() {
	this.mapName = "";
	this.mapLoaded = false;

	this.tileSetName = ""; // We can get the location without loading "image". Still need dimensions of image, though, so why bother?
	this.tileSetFirstGID = -1;
	this.tileSetTileWidth = -1;
	this.tileSetTileHeight = -1;

	this.mapWidth = -1;
	this.mapHeight = -1;
	this.mapPXHeight = -1;
	this.mapPXWidth = -1;
	this.tileValues = new Array();

	this.startX = -1;
	this.startY = -1;
	this.endX = -1;
	this.endY = -1;
};

LPTiledMap.prototype.loadMap = function(mapName) {
	if (this.mapName != mapName) {
		this.mapLoaded = false;
	}


	var xmlHR = new XMLHttpRequest();

	xmlHR.onload = function() {
		var rootChildNodesLength = xmlHR.responseXML.documentElement.childNodes.length;

		for (var i = 0; i < rootChildNodesLength; i++) {
			var tempNode = xmlHR.responseXML.documentElement.childNodes[i];

			if (tempNode.nodeName == "tileset") {
				var attributesLength = tempNode.attributes.length;
				for (var j = 0; j < attributesLength; j++) {
					var tempAttribute = tempNode.attributes[j];
					if (tempAttribute.name == "name") { // do nothing
					} else if (tempAttribute.name == "firstgid") { // do nothing
					} else if (tempAttribute.name == "tilewidth") {
						this.tileSetTileWidth = tempAttribute.value;
					} else if (tempAttribute.name = "tileheight") {
						this.tileSetTileHeight = tempAttribute.value;
					}
				}
			} else if (tempNode.nodeName == "layer") {
				var attributesLength = tempNode.attributes.length;
				for (var j = 0; j < attributesLength; j++) {
					var tempAttribute = tempNode.attributes[j];
					if (tempAttribute.name == "name") { // do nothing
					} else if (tempAttribute.name == "width") {
						this.mapWidth = tempAttribute.value;
						this.mapPXWidth = this.mapWidth * this.tileSetTileWidth;
					} else if (tempAttribute.name == "height") {
						this.mapHeight = tempAttribute.value;
						this.mapPXHeight = this.mapHeight * this.tileSetTileHeight;
					}
				}

				this.tileValues = new Array(this.mapWidth * this.mapHeight); // 1 layer map only right now

				this.startTile = -1;
				this.endTile = -1;

				// now loop to create array with info for map.
				var layerLength = tempNode.childNodes.length;
				for (var j = 0; j < layerLength; j++) {
					var tempDataNode = tempNode.childNodes[j];
					if (tempDataNode.nodeName == "data") {
						var dataLength = tempDataNode.childNodes.length;
						var tileValuesCounter = 0;
						for (var k = 0; k < dataLength; k++) {
							if (tempDataNode.childNodes[k].nodeName == "tile") {
								var tempTileNode = tempDataNode.childNodes[k];

								if (tempTileNode.attributes[0].value == 3) {
									this.startTile = tileValuesCounter;
								} else if (tempTileNode.attributes[0].value == 4) {
									this.endTile = tileValuesCounter;
								}

								this.tileValues[tileValuesCounter++] = tempTileNode.attributes[0].value;
							}
						}
					}
				}

				this.startX = (this.startTile % this.mapWidth) * 32
				this.startY = (Math.floor(this.startTile / this.mapWidth)) * 32
				this.endX = (this.endTile % this.mapWidth) * 32
				this.endY = (Math.floor(this.endTile / this.mapWidth)) * 32
			}
		}

		this.mapLoaded = true;
	}

	xmlHR.onerror = function() {
		console.log("Error while getting XML.");
	}

	xmlHR.returnStuff = function(lptm) {
		lptm.mapWidth = this.mapWidth;
		lptm.mapPXWidth = this.mapPXWidth;
		lptm.mapHeight = this.mapHeight;
		lptm.mapPXHeight = this.mapPXHeight;
		lptm.tileValues = this.tileValues;
		lptm.mapLoaded = this.mapLoaded;
		lptm.startX = this.startX;
		lptm.startY = this.startY;
		lptm.endX = this.endX;
		lptm.endY = this.endY;
	}

	if (this.mapLoaded == false) {

		var mapToLoad = "res/mapXML/" + mapName + ".xml"; // This is pretty much the lease safe way to do this.
		xmlHR.open("GET", mapToLoad); // sanitized mapName goes here.
		xmlHR.responseType = "document";
		xmlHR.myNewResponse = function(m) {
			this.a = 10;
		};
		xmlHR.send();
	}

	var that = this; // An obvious solution from http://stackoverflow.com/questions/2130241/pass-correct-this-context-to-settimeout-callback
	setTimeout(function() {xmlHR.returnStuff(that)}, 1000);

	this.mapName = mapName;
};

LPTiledMap.prototype.renderMap = function(canvasContext, mapOffsetX, mapOffsetY) {
	// should we do this here? How do we control what portion of the map is rendered in the future?
	// We have all the data to draw it else where…
	if (this.tileValues.length > 0) { // Only the most basic check here. Live fast, die young.
		for (var i = 0; i < this.tileValues.length; i++) {
			if (this.tileValues[i]) {
				// draw tv[i][j] as a rectangle for now.`
				if (this.tileValues[i] == 2) {
					canvasContext.fillStyle = "#FFF";
				} else if (this.tileValues[i] > 2) { // either start or stop square
					canvasContext.fillStyle = "#999";
				} else {
					canvasContext.fillStyle = "#000";
				}
				canvasContext.fillRect((i%this.mapWidth)*32+mapOffsetX,(Math.floor(i/this.mapWidth))*32+mapOffsetY,32,32);
			}
		}
	}
};

LPTiledMap.prototype.setPlayerPosition = function(oldX, oldY, newX, newY, mapOffsetX, mapOffsetY) { // write over the newX and newY
	if (oldX != newX || oldY != newY) {
		var xPass, yPass;
		xPass = false;
		yPass = false;

		var tileX, tileY;
		tileX = -1;
		tileY = -1;
		var left, right, up, down;
		left = false;
		right = false;
		up = false;
		down = false;

		for(var i = 0; i < this.tileValues.length; i++) {
			// i/width = row, i%width = column
			if (newX >= (i%this.mapWidth)*32+mapOffsetX && newX < (i%this.mapWidth)*32+32+mapOffsetX) {
				// column for first check
				tileX = i%this.mapWidth;
			}
			if (newY >= (i/this.mapWidth)*32+mapOffsetY && newY < (i/this.mapWidth)*32+32+mapOffsetY) {
				// row for first check
				tileY = i/this.mapWidth;
			}
		}

		// other checks = fX+32,fY; fX,fY+32; fX+32,fY+32

		var tile1, tile2, tile3, tile4;
		tile1 = this.mapWidth*tileY+tileX;

		if (oldX >= newX) {
			left = true;
		} else if (oldX < newX) {
			right = true;
		}
		if (oldY > newY) {
			up = true;
		} else if (oldY < newY) {
			down = true;
		}

		// make sure we force the player into the normally valid playspace; only needed for down and right because up corrects itself (gravity) and left is always valid (theoretically)
		// should check everywhere, but saving some time.
		if (tileX*32+mapOffsetX+32 > this.mapWidth+mapOffsetX) {
			newX = tileX*32+mapOffsetX-32;
		}
		if (tileY*32+mapOffsetY+32 > this.mapHeight+mapOffsetY) {
			newY = tileY*32+mapOffsetY-32;
		}


		/*
			0 1 2 3 4 5 6 7 8 9

			width*row + column = i

			0 1 2 3 4
			5 6 7 8 9

			if oldX == newX and oldY == newY, skip everything; we'll have already checked this spot

			if oldX == newX and oldY != newY, only need check 3 and/or 4

			if oldX != newX and oldY == newY, only need check 1 and/or 2

			else need to check all

		*/
	}
}

LPTiledMap.prototype.getTileValue = function(xCoord, yCoord, mapOffsetX, mapOffsetY, pass) {
	// need to get whether it is possible for a character to enter
	xCoord = Math.floor(xCoord);
	yCoord = Math.floor(yCoord);
	var xMap = 0;
	var yMap = 0;
	for (var i = 0; i < this.tileValues.length; i++) {
		if (i%this.mapWidth == (xCoord-mapOffsetX)/32) {
			xMap = i;
			break;
		}
	}
	for (var i = 0; i < this.tileValues.length; i++) {
		if (Math.floor(i/this.mapWidth) == (yCoord-mapOffsetY)/32) {
			yMap = i;
			break;
		}
	}

	var i = xMap+this.mapWidth*yMap;

	pass = this.tileValues[i] == 2;

	console.log(pass);
}

LPTiledMap.prototype.resolveCollision = function(position, mapOffsetX, mapOffsetY) {
	var xOld;
	var yOld;
	var xNew;
	var yNew;

	xOld = position.xCurrent;
	yOld = position.yCurrent;
	xNew = position.xNew;
	yNew = position.yNew;

	var xCheck = 0;
	var yCheck = 0;
	var xMap = 0;
	var yMap = 0;
	var tileId = -1;
	var pass = false;

	if (xOld == xNew) {
		//xCheck = xOld;
	} else if (xOld < xNew) {
		xCheck = xNew + 32; // Grab right corner
	} else {
		xCheck = xNew; // Use left corner
	}
	if (yOld = yNew) {
		// n/a
	} else if (yOld < yNew) {
		yCheck =  yNew + 32 // Get bottom corner
	} else {
		yCheck = yNew; // Use top corner
	}

	// xCheck w/ yNew and yNew+32 for both top and bottom of side we need to check
	for (var i = 0; i < this.tileValues.length; i++) {
		if (i%this.mapWidth == Math.floor((xCheck-mapOffsetX)/32)) {
			xMap = i;
			break;
		}
	}
	for (var i = 0; i < this.tileValues.length; i++) {
		if (Math.floor(i/this.mapWidth) == Math.floor((yNew-mapOffsetY)/32)) {
			yMap = i;
			break;
		}
	}
	tileId = xMap+yMap;
	pass = this.tileValues[tileId] == 2;
	// +32 part
	if (pass) {
		for (var i = 0; i < this.tileValues.length; i++) {
			if (i%this.mapWidth == Math.floor((xCheck-mapOffsetX)/32)) {
				xMap = i;
				break;
			}
		}
		for (var i = 0; i < this.tileValues.length; i++) {
			if (Math.floor(i/this.mapWidth) == Math.floor((yNew+31-mapOffsetY)/32)) {
				yMap = i;
				break;
			}
		}
		tileId = xMap+yMap;
		pass = this.tileValues[tileId] == 2;
	}
	if (!pass) {
		xNew = xOld; // quick test for POC
		position.xNew = xOld;
	} else {
		position.xNew = xNew;
	}
}

