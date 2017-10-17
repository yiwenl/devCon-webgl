// ViewObjModel.js

import alfrid, { GL } from 'alfrid';
import Assets from './Assets';

import vs from '../shaders/pbr.vert';
import fs from '../shaders/pbr.frag';

class ViewObjModel extends alfrid.View {
	
	constructor() {
		super(vs, fs);
		this.time = Math.random() * 0xFF;
	}


	_init() {
		this.mesh = Assets.get('ball');

		this.roughness = 1;
		this.specular = 0;
		this.metallic = 0;
		this.baseColor = [1, 1, 1];

		gui.add(this, 'roughness', 0, 1);
		gui.add(this, 'specular', 0, 1);
		gui.add(this, 'metallic', 0, 1);


		const positions = this.mesh.getAttribute('aVertexPosition').source;

		function getCenter(a, b, c) {
			let x = (a[0] + b[0] + c[0]) / 3;
			let y = (a[1] + b[1] + c[1]) / 3;
			let z = (a[2] + b[2] + c[2]) / 3;

			return [x, y, z];
		}

		let a, b, c;

		const centers = [];
		for(let i=0; i<positions.length; i+=3) {
			a = positions[i];
			b = positions[i+1];
			c = positions[i+2];

			let center = getCenter(a, b, c);

			centers.push(center);
			centers.push(center);
			centers.push(center);
		}

		this.mesh.bufferData(centers, 'aCenter');
	}


	render(textureRad, textureIrr) {
		this.time += 0.005;
		this.shader.bind();

		this.shader.uniform('uRadianceMap', 'uniform1i', 0);
		this.shader.uniform('uIrradianceMap', 'uniform1i', 1);
		textureRad.bind(0);
		textureIrr.bind(1);

		this.shader.uniform('uBaseColor', 'uniform3fv', this.baseColor);
		this.shader.uniform('uRoughness', 'uniform1f', this.roughness);
		this.shader.uniform('uMetallic', 'uniform1f', this.metallic);
		this.shader.uniform('uSpecular', 'uniform1f', this.specular);

		this.shader.uniform('uExposure', 'uniform1f', params.exposure);
		this.shader.uniform('uGamma', 'uniform1f', params.gamma);
		this.shader.uniform('uTime', 'uniform1f', this.time);

		GL.draw(this.mesh);
	}


}

export default ViewObjModel;