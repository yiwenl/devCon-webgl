// ViewCube.js

import alfrid, { GL } from 'alfrid';
import vs from 'shaders/cubes.vert';
import fs from 'shaders/cubes.frag';
import getPos from './getPos';

import Assets from './Assets';

class ViewCube extends alfrid.View {
	
	constructor(mPosition = [0, 0, 0]) {
		super(vs, fs);
		this.position = mPosition;
		this.time = Math.random() * 0xFF;
	}


	_init() {
		const s = 1;
		this.mesh = alfrid.Geom.cube(1, 1, 1);

		this._positions = [];
		// for(let i=0; i<1000; i++) {
		// 	this._positions.push(getPos());
		// }

		let num = 15;
		for(let x=0; x<num; x++) {
			for(let y=0; y<num; y++) {
				for(let z=0; z<num; z++) {
					let tx = -num/2 + x + 0.5;
					let ty = -num/2 + y + 0.5;
					let tz = -num/2 + z + 0.5;

					this._positions.push([tx, ty, tz]);
				}
			}
		}

		this.mesh.bufferInstance(this._positions, 'aPosOffset');
	}


	render() {
		this.time += 0.01;
		this.shader.bind();
		this.shader.uniform("time", "float", this.time);
		
		this.shader.uniform("texture", "uniform1i", 0);
		Assets.get('gradient1').bind(0);

		// this._positions.forEach( pos => {
		// 	this.shader.uniform("uPosition", "vec3", pos);
		// 	GL.draw(this.mesh);	
		// });


		// this.shader.uniform("uPosition", "vec3", this.position);
		GL.draw(this.mesh);	
		
	}


}

export default ViewCube;