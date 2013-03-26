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
						console.log("3");
					} else if (tempAttribute.name = "tileheight") {
						console.log("4");
					}
				}
			} else if (tempNode.nodeName == "layer") {
				var attributesLength = tempNode.attributes.length;
				for (var j = 0; j < attributesLength; j = j + 1) {
					var tempAttribute = tempNode.attributes[j];

					if (tempAttribute.name == "name") {
						console.log("5");
					} else if (tempAttribute.name == "width") {
						console.log("6");
					} else if (tempAttribute.name == "height") {
						console.log("7");
					}
				}
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