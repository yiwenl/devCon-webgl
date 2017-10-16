// ViewCubes.js

import alfrid, { GL } from 'alfrid';

var random = function(min, max) { return min + Math.random() * (max - min);	}

import vs from 'shaders/cubes.vert';
import fs from 'shaders/cubes.frag';

class ViewCubes extends alfrid.View {
	
	constructor() {
		super(vs, fs);

		this.time = Math.random() * 0xff;
	}


	_init() {
		const s = .1;
		this.mesh = alfrid.Geom.cube(s, s, s);

		const positions = [];
		const extra = [];

		const num = 1500;
		for(let i=0; i<num; i++) {
			let a = Math.random() * Math.PI * 2;
			let r = random(2.5, 4)/3;

			positions.push([Math.cos(a) * r, Math.sin(a) * r, random(-.2, .2)]);
			extra.push([Math.random(), Math.random(), Math.random()]);
		}


		this.mesh.bufferInstance(positions, 'aPosOffset');
		this.mesh.bufferInstance(extra, 'aExtra');
	}


	render() {
		this.time += 0.01;
		this.shader.bind();
		this.shader.uniform("uTime", "float", this.time);
		GL.draw(this.mesh);
	}


}

export default ViewCubes;