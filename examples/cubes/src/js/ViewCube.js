// ViewCube.js

import alfrid, { GL } from 'alfrid';
import vs from 'shaders/cube.vert';
import fs from 'shaders/cube.frag';

var random = function(min, max) { return min + Math.random() * (max - min);	}

class ViewCube extends alfrid.View {
	
	constructor(mPos) {
		super(vs, fs);
		this.position = mPos;
		this.time = Math.random();
	}


	_init() {
		const s = .1;
		this.mesh = alfrid.Geom.cube(s, s, s);


		function getPos() {

			let r = random(1.5, 2);
			let a = Math.random() * Math.PI * 2.0;

			return [
				Math.cos(a) * r,
				Math.sin(a) * r,
				random(-.2, .2)
			]

		}

		const num = 1000;
		this._cubes = [];
		this._positions = [];
		const extra = [];
		for(let i=0; i<num; i++) {
			// const cube = new ViewCube([Math.random(), Math.random(), Math.random()]);
			// this._cubes.push(cube);

			// this._positions.push([Math.random(), Math.random(), Math.random()]);
			this._positions.push(getPos());
			extra.push([Math.random(), Math.random(), Math.random()]);
		}


		this.mesh.bufferInstance(this._positions, 'aPosOffset');
		this.mesh.bufferInstance(extra, 'aExtra');

	}


	render(pos) {
		this.time += 0.01;
		this.shader.bind();
		this.shader.uniform("uTime", "float", this.time);
		// this.shader.uniform("uPosition", "vec3", pos);
		GL.draw(this.mesh);
	}


}

export default ViewCube;