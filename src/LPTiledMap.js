// LPTiledMap
// A class for loading and containing map data from TiledMaps. We will look for certain specific attributes by default,
// however, so this may not be a great class since it won't be perfectly re-applicable for some projects.

var LPTiledMap = function() {
	this.mapName = "";
	this.mapLoaded = false;
}

LPTiledMap.prototype.loadMap = function(mapName) {
	var xmlHR = new XMLHttpRequest();
	xmlHR.onload = function() {
		var collectionLength = xmlHR.responseXML.documentElement.childNodes.length;

		for (var i = 0; i < collectionLength; i = i + 1) {
			var tempNode = xmlHR.responseXML.documentElement.childNodes[i];
			if (tempNode.nodeName == "tileset") {
				console.log("moo");
				// tempNode.attributes … is there a length for this as well? 
			} else if (tempNode.nodeName == "layer") {
				console.log("gum");
			}
		}
	}
	xmlHR.onerror = function() {
		console.log("Error while getting XML.");
	}
	xmlHR.open("GET", "res/mapXML/test.xml"); // sanitized mapName goes here.
	xmlHR.responseType = "document";
	xmlHR.send();

	this.mapName = mapName;
}