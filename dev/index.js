// index.js
import alfrid, { GL } from 'alfrid';
import dat from 'dat-gui';

const size = Math.min(window.innerHeight, 500);
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

GL.init(canvas);
GL.setSize(size, size);

const gui = new dat.GUI();

const center = vec3.fromValues(0, 0, 0);
const up = vec3.fromValues(0, 1, 0);
const cameraPos = {
	x:0,
	y:0,
	z:.5
};

gui.add(cameraPos, 'x', -1, 1);
gui.add(cameraPos, 'y', -1, 1);
gui.add(cameraPos, 'z', -5, 5);

const test = alfrid.Geom.cube(1, 1, 1);
console.log(test.attributes);


const d = .5;
const positions = [
	[-d, -d, 0],
	 [d, -d, 0],
	 [0,  d, 0]
];

const colors = [
	[1, 0, 0],
	[0, 1, 0],
	[0, 0, 1]
]

const indices = [0, 1, 2];

const mesh = new alfrid.Mesh();
mesh.bufferVertex(positions);
mesh.bufferData(colors, 'aColor');
mesh.bufferIndex(indices);


//	shader
const vs = `
	precision highp float;
	attribute vec3 aVertexPosition;
	attribute vec3 aColor;
	uniform mat4 uViewMatrix;
	uniform mat4 uProjMatrix;

	varying vec3 vColor;

	void main() {
		gl_Position = uProjMatrix * uViewMatrix * vec4(aVertexPosition, 1.0);

		vColor = aColor;
	}
`;

const fs = `
	precision highp float;

	varying vec3 vColor;

	void main() {
		gl_FragColor = vec4(vColor, 1.0);
	}
`;

const shader = new alfrid.GLShader(vs, fs);


//	camera
const view = mat4.create();

const proj = mat4.create();
const RAD = Math.PI/180;
mat4.perspective(proj, 60 * RAD, 1, .1, 100);



loop();


function loop() {

	mat4.lookAt(view, vec3.fromValues(cameraPos.x, cameraPos.y, cameraPos.z), center, up);

	GL.clear(0, 0, 0, 1);

	shader.bind();
	shader.uniform("uViewMatrix", "mat4", view);
	shader.uniform("uProjMatrix", "mat4", proj);
	GL.draw(mesh);

	requestAnimationFrame(loop);
}