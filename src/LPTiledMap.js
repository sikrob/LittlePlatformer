// LPTiledMap
// A class for loading and containing map data from TiledMaps. We will look for certain specific attributes by default,
// however, so this may not be a great class since it won't be perfectly re-applicable for some projects.

var LPTiledMap = function() {
	this.mapName = "";
	this.mapLoaded = false;

	this.tileSetName = ""; // We can get the location without loading "image". Still need dimensions of image, though, so why bother?
	this.tileSetFirstGID = -1;
	this.tileSetTileWidth = -1;
	this.tileSetTileHeight = -1;

	this.mapWidth = -1;
	this.mapHeight = -1;
	this.tileValues = new Array();
}

LPTiledMap.prototype.loadMap = function(mapName) {
	var xmlHR = new XMLHttpRequest();
	xmlHR.onload = function() {
		var rootChildNodesLength = xmlHR.responseXML.documentElement.childNodes.length;

		for (var i = 0; i < rootChildNodesLength; i = i + 1) {
			var tempNode = xmlHR.responseXML.documentElement.childNodes[i];

			if (tempNode.nodeName == "tileset") {
				var attributesLength = tempNode.attributes.length;
				for (var j = 0; j < attributesLength; j = j + 1) {
					var tempAttribute = tempNode.attributes[j];
					if (tempAttribute.name == "name") {
						console.log("1");
					} else if (tempAttribute.name == "firstgid") {
						console.log("2");
					} else if (tempAttribute.name == "tilewidth") {
						this.tileSetTileWidth = tempAttribute.value;
					} else if (tempAttribute.name = "tileheight") {
						this.tileSetTileHeight = tempAttribute.value;
					}
				}

			} else if (tempNode.nodeName == "layer") {
				var attributesLength = tempNode.attributes.length;
				for (var j = 0; j < attributesLength; j = j + 1) {
					var tempAttribute = tempNode.attributes[j];
					if (tempAttribute.name == "name") {
						console.log("5");
					} else if (tempAttribute.name == "width") {
						this.mapWidth = tempAttribute.value;
					} else if (tempAttribute.name == "height") {
						this.mapHeight = tempAttribute.value;
					}
				}

				// now loop to create array with info for map.
			}

		}

		this.mapLoaded = true;
	}
	xmlHR.onerror = function() {
		console.log("Error while getting XML.");
	}
	xmlHR.open("GET", "res/mapXML/test.xml"); // sanitized mapName goes here.
	xmlHR.responseType = "document";
	xmlHR.send();

	this.mapName = mapName;
}