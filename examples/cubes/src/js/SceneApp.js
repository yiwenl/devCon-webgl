// SceneApp.js

import alfrid, { Scene, GL } from 'alfrid';
import ViewCube from './ViewCube';
import Assets from './Assets';

var random = function(min, max) { return min + Math.random() * (max - min);	}

class SceneApp extends Scene {
	constructor() {
		super();
		GL.enableAlphaBlending();
		this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;
		this.orbitalControl.radius.value = 20;


		this.cameraOrtho = new alfrid.CameraOrtho();

		const s = 10;
		this.cameraOrtho.ortho(-s, s, -s, s, .1, 100);

		new alfrid.OrbitalControl(this.cameraOrtho, window, 20);
	}

	_initTextures() {
		console.log('init textures');
	}


	_initViews() {
		console.log('init views');

		this._bCopy = new alfrid.BatchCopy();
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();


		this._vCube = new ViewCube();
		
	}


	render() {
		GL.clear(0, 0, 0, 0);

		// GL.setMatrices(this.cameraOrtho);

		// this._bAxis.draw();
		this._bDots.draw();

		this._vCube.render();
	}


	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}


export default SceneApp;