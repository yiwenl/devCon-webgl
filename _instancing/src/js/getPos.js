// getPos.js


var random = function(min, max) { return min + Math.random() * (max - min);	}


export default function(radius = 10) {
	return [random(-radius, radius), random(-radius, radius), random(-radius, radius)];
}