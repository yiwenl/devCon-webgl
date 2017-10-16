// index.js
import alfrid, { GL } from 'alfrid';
import dat from 'dat-gui';

const size = Math.min(window.innerHeight, 500);
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);


const gui = new dat.GUI({width:300});
const cameraPos = {
	x:0,
	y:0,
	z:1
}

gui.add(cameraPos, 'x', -5, 5);
gui.add(cameraPos, 'y', -5, 5);
gui.add(cameraPos, 'z', -5, 5);

// GL.init(canvas, {ignoreWebgl2:true});
GL.init(canvas);
GL.setSize(size, size);


const vert = `
	precision highp float;
	attribute vec3 aVertexPosition;
	attribute vec3 aColor;

	uniform mat4 uProjMatrix;
	uniform mat4 uViewMatrix;

	varying vec3 vColor;

	void main() {
		gl_Position = uProjMatrix * uViewMatrix * vec4(aVertexPosition, 1.0);

		vColor = aColor;
	}
`;		

const frag = `
	precision highp float;
	varying vec3 vColor;
	void main() {
		gl_FragColor = vec4(vColor, 1.0);
	}
`;

const d = .5;
const positions = [
	[-d, -d, 0],
	[d, -d, 0],
	[0, d, 0]
];

const colors = [
	[1, 0, 0],
	[0, 1, 0],
	[0, 0, 1]
]


const mesh = new alfrid.Mesh();
mesh.bufferVertex(positions);
mesh.bufferData(colors, 'aColor');
mesh.bufferIndex([0, 1, 2]);

const shader = new alfrid.GLShader(vert, frag);


const view = mat4.create();
const proj = mat4.create();
const center = vec3.fromValues(0, 0, 0);
const up = vec3.fromValues(0, 1, 0);


const RAD = Math.PI/ 180;
mat4.perspective(proj, 60 * RAD, GL.aspectRatio, .1, 100);

alfrid.Scheduler.addEF(loop);


function loop() {
	let eye = vec3.fromValues(cameraPos.x, cameraPos.y, cameraPos.z);
	mat4.lookAt(view, eye, center, up);

	GL.clear(0, 0, 0, 1);
	shader.bind();
	shader.uniform("uViewMatrix", "mat4", view);
	shader.uniform("uProjMatrix", "mat4", proj);
	GL.draw(mesh);
}