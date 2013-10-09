// LPMapList.js
// A class to read and contain the resulting list of maps to load
function LPMapList() {
	this.mapListLoaded = false;
	this.mapListName = "";
	this.mapList = [];
	this.currentMapIndex = -1;
}

LPMapList.prototype.loadMapList = function(mapListName) {
	if (this.mapListName != mapListName) {
		this.mapListLoaded = false;
	}

	var xmlHR = new XMLHttpRequest();

	xmlHR.onload = function() {
		var rootChildNodesLength = xmlHR.responseXML.documentElement.childNodes.length;

		for (var i = 0; i < rootChildNodesLength; i++) {
			var tempNode = xmlHR.responseXML.documentElement.childNodes[i];
			// grab the length of the array
			// mapList = new Array(dadadada);
			// grab the map nodes
			// grab the child data of the map nodes
			// assemble into the list
		}

		this.mapListLoaded = true;
	}

	xmlHR.onerror = function() {
		console.log("Error retrieving map list.");
	}

	xmlHR.returnStuff = function(lpml) {
		lpml.mapList = this.mapList;
		lpml.mapListLoaded = this.mapListLoaded;
	}

	if (this.mapListLoaded == false) {
		var mapListToLoad = "res/mapXML/" + mapListName + ".xml"; // like in LPTiledMap, need to sanitize this.
		xmlHR.open("GET", mapListToLoad);
		xmlHR.responseType = "document";
		xmlHR.send();
	}

	var that = this;
	setTimeout(function() {xmlHR.returnStuff(that)}, 1000);
	this.mapListName = mapListName;
};