// ViewCube.js


import alfrid, { GL } from 'alfrid';
import vs from 'shaders/cube.vert';
import fs from 'shaders/cube.frag';
import Assets from './Assets';

var random = function(min, max) { return min + Math.random() * (max - min);	}

class ViewCube extends alfrid.View {
	
	constructor(mPos) {
		super(vs, fs);
		this._position = mPos;
		this.time = Math.random() * 0xFF;
	}


	_init() {
		const s = .995;
		this.mesh = alfrid.Geom.cube(s, s, s);

		const r = 10;
		this._positions = [];

		for(let i=0; i<r; i++) {
			for(let j=0; j<r; j++) {
				for(let k=0; k<r; k++) {

					const pos = [-r/2 + i, -r/2 +j, -r/2 + k];

					this._positions.push(pos);
				}
			}
		}

		this.mesh.bufferInstance(this._positions, 'aPosOffset');
	}


	render() {
		this.time += 0.01;
		this.shader.bind();
		this.shader.uniform("uTime", "float", this.time);

		this.shader.uniform("texture", "uniform1i", 0);
		Assets.get('gradient').bind(0);
		GL.draw(this.mesh);
	}


}

export default ViewCube;