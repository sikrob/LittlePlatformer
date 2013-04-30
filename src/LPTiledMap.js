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
	this.tileValues = new Array(10);
};

LPTiledMap.prototype.loadMap = function(mapName) {
	var xmlHR = new XMLHttpRequest();
	if (!xmlHR.responseXML) {
		console.log("Response empty prior to request.");
	}

/*	xmlHR.onload = function() {
		var rootChildNodesLength = xmlHR.responseXML.documentElement.childNodes.length;

		for (var i = 0; i < rootChildNodesLength; i++) {
			var tempNode = xmlHR.responseXML.documentElement.childNodes[i];

			if (tempNode.nodeName == "tileset") {
				var attributesLength = tempNode.attributes.length;
				for (var j = 0; j < attributesLength; j++) {
					var tempAttribute = tempNode.attributes[j];
					if (tempAttribute.name == "name") {
//						console.log("1");
					} else if (tempAttribute.name == "firstgid") {
//						console.log("2");
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
					if (tempAttribute.name == "name") {
//						console.log("tA.name = " + tempAttribute.name);
					} else if (tempAttribute.name == "width") {
						this.mapWidth = tempAttribute.value;
					} else if (tempAttribute.name == "height") {
						this.mapHeight = tempAttribute.value;
					}
				}

				if (!this.tileValues) {
					this.tileValues = new Array(10);
					this.tileValues[i] = new Array(this.mapWidth * this.mapHeight); // multidimensional magic
				}

				// now loop to create array with info for map.
				var layerLength = tempNode.childNodes.length;
				for (var j = 0; j < layerLength; j++) {
					var tempDataNode = tempNode.childNodes[j];
					if (tempDataNode.nodeName == "data") {
						var dataLength = tempDataNode.childNodes.length;
						for (var k = 0; k < dataLength; k++) {
							if (tempDataNode.childNodes[k].nodeName == "tile") {
								var tempTileNode = tempDataNode.childNodes[k];
								var tempTileNodeAttibuteLength = tempTileNode.attributes.length;
								for (var l = 0; l < tempTileNodeAttibuteLength; l++) {
									this.tileValues[i][k] = tempTileNode.attributes[l].value;
								}
							}
						}
					}
				}
			}
		}

		this.mapLoaded = true;
		console.log("onload:"+this.mapLoaded);
	}*/
	xmlHR.onerror = function() {
		console.log("Error while getting XML.");
	}

	if (this.mapLoaded == false) {
		xmlHR.open("GET", "res/mapXML/0.xml", true); // sanitized mapName goes here.
		xmlHR.responseType = "document";
		xmlHR.send();

//		var xmlDoc = xmlHR.responseXML;
		console.log("moooo");
		this.mapLoaded = true;
	}

	// quick debug seciton, saved for now, delete later
	if (this.tileValues) {
		for (var i = 0; i < this.tileValues.length; i++) {
			if (this.tileValues[i]) {
				for (var j = 0; j < this.tileValues[i].length; j++) {
					if (this.tileValues[i][j]) {
						console.log("m:" + this.tileValues[i][j]);
					}
				}
			}
		}
	}

	

	console.log("!onload:"+this.mapLoaded);
	this.mapName = mapName;
};

LPTiledMap.prototype.renderMap = function(canvasContext) {
	// should we do this here? How do we control what portion of the map is rendered in the future?
	// We have all the data to draw it else where…

	var old = canvasContext.fillStyle;
	canvasContext.fillStyle = "#000"
	canvasContext.fillRect(200,100,400,400);
	canvasContext.fillStyle = old;

	if (this.tileValues) { // Only the most basic check here. Live fast, die young.
		for (var i = 0; i < this.tileValues.length; i++) {

			if (this.tileValues[i]) {

				console.log("2");

				for (var j= 0; j < this.tileValues[i].length; j++) {
					// draw tv[i][j] as a rectangle for now.`
					if (this.tileValues[i][j] == 0) {
						console.log("3");
						canvasContext.fillStyle = "#000";
					} else {
						console.log("4");
						canvasContext.fillStyle = "#999";
					}
					console.log("5");
					canvasContext.fillRect((i-(i/this.mapWidth)*this.mapWidth)*32,(i/this.mapWidth)*32,32,32);
				}
			}
		}
	}
};