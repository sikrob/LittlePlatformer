// getConstant.js
// Perhaps this is where it becomes ever more clear that I don't know what I'm doing with 
// JavaScript, but this seems like as good a way as any to get my constants passed around
// while making sure they CAN NOT be changed.

// This may be removed and a dictionary used in its place if I never need something that isn't
// a number.

var getConstant = function(requestedConstant) {
	var constant = -1;

	switch (requestedConstant) {
		case "SPACEBAR":
			constant = 32;
			break;
		case "LEFT":
			constant = 37;
			break;
		case "UP":
			constant = 38;
			break;
		case "RIGHT":
			constant = 39;
			break;
		case "DOWN":
			constant = 40;
			break;
		case "W":
			constant = 87;
			break;
		case "A":
			constant = 65;
			break;
		case "S":
			constant = 83;
			break;
		case "D":
			constant = 68;
			break;
		case "ENTER":
			constant = 13;
			break;
	}

	return constant;
};
