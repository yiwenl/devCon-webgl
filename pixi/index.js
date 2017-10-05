// index.js

import * as PIXI from 'pixi.js';

const renderer = PIXI.autoDetectRenderer(500, 500);
document.body.appendChild(renderer.view);

const stage = new PIXI.Stage();

const d = .5;
const positions = [

	-d, 0, 0,
	 d, 0, 0,
	 d, d, 0
];

const indices = [0, 1, 2];
const geometry = new PIXI.mesh.Geometry()
					.addAttribute('aVertexPosition', positions)
					.addIndex(indices);
const vs = `
	precision highp float;
	attribute vec3 aVertexPosition;

	void main() {
		gl_Position = vec4(aVertexPosition, 1.0);
	}
`;		

const fs = `
	void main() {
		gl_FragColor = vec4(1.0);
	}
`;

const shader = PIXI.Shader.from(vs, fs);
const mesh = new PIXI.mesh.RawMesh(geometry, shader);
stage.addChild(mesh);




loop();

function loop() {
	
	renderer.render(stage);

	requestAnimationFrame(loop);

}