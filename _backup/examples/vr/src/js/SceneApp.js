// SceneApp.js

import alfrid, { Scene, GL } from 'alfrid';
import ViewObjModel from './ViewObjModel';
import Assets from './Assets';

class SceneApp extends Scene {
	constructor() {
		super();
		GL.enableAlphaBlending();
		// this.orbitalControl.rx.value = this.orbitalControl.ry.value = 0.3;
		this.orbitalControl.radius.value = 5;
		this.orbitalControl.lock(true);


		this.modelMatrix = mat4.create();
		mat4.translate(this.modelMatrix, this.modelMatrix, vec3.fromValues(0, 0, -2));

		this.cameraVR = new alfrid.Camera();
	}

	_initTextures() {
		console.log('init textures');
	}


	_initViews() {
		console.log('init views');

		this._bCopy = new alfrid.BatchCopy();
		this._bAxis = new alfrid.BatchAxis();
		this._bDots = new alfrid.BatchDotsPlane();
		this._bSky = new alfrid.BatchSkybox();

		this._vModel = new ViewObjModel();
	}


	render() {
		window.vrDisplay.getFrameData(frameData);

		if(Math.random() > .9) {
			console.log(frameData);	
		}
		
		this.cameraVR.setView(frameData.leftViewMatrix);
		this.cameraVR.setProjection(frameData.leftProjectionMatrix);



		GL.clear(0, 0, 0, 0);
		GL.setMatrices(this.cameraVR);
		GL.rotate(this.modelMatrix);

		this._vModel.render(Assets.get('studio_radiance'), Assets.get('irr'), Assets.get('aomap'));
	}


	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}


export default SceneApp;