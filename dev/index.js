// index.js
console.log('Alfrid example');

import alfrid, { GL } from 'alfrid';

const size = Math.min(window.innerHeight, 500);
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

// GL.init(canvas, {ignoreWebgl2:true});
GL.init(canvas);
GL.setSize(size, size);


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
	[-d, -d, 0],
	 [d, -d, 0],
	 [0, d, 0]
];


const mesh = new alfrid.Mesh();
mesh.bufferVertex(positions);
mesh.bufferIndex([0, 1, 2]);

const shader = new alfrid.GLShader(vert, frag);



alfrid.Scheduler.addEF(loop);


function loop() {
	GL.clear(0, 0, 0, 1);
	shader.bind();
	GL.draw(mesh);
}