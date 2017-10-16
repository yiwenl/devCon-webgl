// index.js

import _regl from 'regl';

const size = Math.min(window.innerHeight, 500);
const canvas = document.createElement("canvas");
canvas.width = canvas.height = size;
document.body.appendChild(canvas);
const regl = _regl(canvas);


const vert = `
	precision highp float;
	attribute vec3 aVertexPosition;

	void main() {
		gl_Position = vec4(aVertexPosition, 1.0);
	}
`;		

const frag = `
	void main() {
		gl_FragColor = vec4(1.0);
	}
`;

const d = .5;
const positions = [
	-d, -d, 0,
	 d, -d, 0,
	 0, d, 0
];

const attributes = {
	aVertexPosition:positions
}

const drawTriangle = regl({
	vert,
	frag,
	attributes,
	count:3
});


regl.frame(() => {
	regl.clear({
		color: [0, 0, 0, 1],
		depth: 1
	});

	drawTriangle();
});