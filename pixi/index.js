// index.js

import * as PIXI from 'pixi.js';

const size = Math.min(window.innerHeight, 500);
const renderer = PIXI.autoDetectRenderer(size, size);
document.body.appendChild(renderer.view);

const d = 0.9;

const position = [

	-d, -d, 0,
	 d, -d, 0,
	 0,  d, 0,
];


const indice = [0, 1, 2];

const geometry = new PIXI.mesh.Geometry()
					.addAttribute('aVertexPosition', position)
					.addIndex(indice);

const vert = `
	precision highp float;

	attribute vec3 aVertexPosition;

	void main() {
		gl_Position = vec4(aVertexPosition, 1.0);
	}
`

const frag = `
	precision highp float;

	void main() {
		gl_FragColor = vec4(1.0);
	}
`


const shader =  PIXI.Shader.from(vert, frag);

const mesh = new PIXI.mesh.RawMesh(geometry, shader);


loop() ;



function loop() {

	renderer.render(mesh);

	requestAnimationFrame(loop);
}
