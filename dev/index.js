// index.js
import alfrid, { GL } from 'alfrid';
import dat from 'dat-gui';

const size = Math.min(window.innerHeight, 500);
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

GL.init(canvas);
GL.setSize(size, size);

const gui = new dat.GUI();


const d = 0.9;

const position = [

	[-d, -d, 0],
	 [d, -d, 0],
	 [0,  d, 0],
];

const colors = [
	[1, 0, 0],
	[0, 1, 0],
	[0, 0, 1]
]


const indice = [0, 1, 2];

const mesh = new alfrid.Mesh();
mesh.bufferVertex(position);
mesh.bufferData(colors, 'aColor');
mesh.bufferIndex(indice);

const view = mat4.create();

const cameraPos = {
	x:0,
	y:0,
	z:.5
}
const r = 5;
gui.add(cameraPos, 'x', -r,r );
gui.add(cameraPos, 'y', -r,r );
gui.add(cameraPos, 'z', -r,r );

const center = vec3.fromValues(0, 0, 0);
const up = vec3.fromValues(0, 1, 0);



const proj = mat4.create();
mat4.perspective(proj, Math.PI/4, 1, .1, 100);



const vert = `
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
`

const frag = `
	precision highp float;
	varying vec3 vColor;

	void main() {
		gl_FragColor = vec4(vColor, 1.0);
	}
`


const shader = new alfrid.GLShader(vert, frag);

loop();


function loop() {

	mat4.lookAt(view, [cameraPos.x, cameraPos.y, cameraPos.z], center, up);

	GL.clear(0, 0, 0, 1);

	shader.bind();
	shader.uniform("uViewMatrix", "mat4", view);
	shader.uniform("uProjMatrix", "mat4", proj);
	GL.draw(mesh);

	requestAnimationFrame(loop);
}