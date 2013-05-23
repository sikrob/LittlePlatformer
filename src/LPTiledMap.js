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
								this.tileValues[tileValuesCounter++] = tempTileNode.attributes[0].value;
							}
						}
					}
				}
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
				} else if (this.tileValues[i] > 2) {
					canvasContext.fillStyle = "#999";
				} else {
					canvasContext.fillStyle = "#000";
				}
				canvasContext.fillRect((i%this.mapWidth)*32+mapOffsetX,(Math.floor(i/this.mapWidth))*32+mapOffsetY,32,32);
			}
		}
	}
};