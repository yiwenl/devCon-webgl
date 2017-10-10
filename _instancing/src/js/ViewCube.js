// ViewCube.js

import alfrid, { GL } from 'alfrid';
import vs from 'shaders/cubes.vert';
import fs from 'shaders/cubes.frag';
import getPos from './getPos';


class ViewCube extends alfrid.View {
	
	constructor(mPosition = [0, 0, 0]) {
		super(vs, fs);
		this.position = mPosition
	}


	_init() {
		const s = 1;
		this.mesh = alfrid.Geom.cube(1, 1, 1);

		this._positions = [];
		for(let i=0; i<1000; i++) {
			this._positions.push(getPos());
		}

		this.mesh.bufferInstance(this._positions, 'aPosOffset');
	}


	render() {
		this.shader.bind();
		

		// this._positions.forEach( pos => {
		// 	this.shader.uniform("uPosition", "vec3", pos);
		// 	GL.draw(this.mesh);	
		// });


		// this.shader.uniform("uPosition", "vec3", this.position);
		GL.draw(this.mesh);	
		
	}


}

export default ViewCube;