// LPTiledMap
// A class for loading and containing map data from TiledMaps. We will look for certain specific attributes by default,
// however, so this may not be a great class since it won't be perfectly re-applicable for some projects.

var LPTiledMap = function() {
	this.mapName = "";
	this.mapLoaded = false;
}

LPTiledMap.prototype.loadMap = function(mapName) {
	//var xmlHR = new XMLHttpRequest();
	//xmlHR.open("GET", "res/mapXML/test.xml", false);
	//xmlHR.send();

	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		var collectionLength = xhr.responseXML.documentElement.childNodes.length;
		console.log(xhr.responseXML.documentElement.childNodes[1].nodeName);
		console.log(collectionLength);
	}
	xhr.onerror = function() {
		console.log("Error while getting XML.");
	}
	xhr.open("GET", "res/mapXML/test.xml");
	xhr.responseType = "document";
	xhr.send();

	/*
var xmlThing = new XMLHttpRequest();
//xmlThing.overrideMimeType('text/xml');
xmlThing.open("GET", "f.xml", false);
xmlThing.send(); // no local files. 
if (xmlThing.status) {
	cheese = true;*/
	this.mapName = mapName;
}