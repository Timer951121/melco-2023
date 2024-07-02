import React from 'react';
import jQuery from 'jquery';
import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import modelHotspot from '../assets/models/hotspot.fbx';
import imgHotspot from '../assets/images/canvas/hotspot.png';
import imgHotYellow from '../assets/images/canvas/hot_yellow.png';
import imgHotRed from '../assets/images/canvas/hot_red.png';
import imgHotGreen0 from '../assets/images/canvas/hot_green_0.png';
import imgHotGreen1 from '../assets/images/canvas/hot_green_1.png';
import imgHotGreen2 from '../assets/images/canvas/hot_green_2.png';
import imgLine from '../assets/images/canvas/line.jpg';
import imgChevron from '../assets/images/chevron_red.png';

// import videoTVWelcome from '../assets/video/welcome_tv.mp4';
// import videoTVLife from '../assets/video/life_tv.mp4';
// import videoTVIndustry from '../assets/video/industry_tv.mp4';
// import videoTVStructure from '../assets/video/structure_tv.mp4';

import {sceneArr, Get2DPos, SetTween, SetOpacity} from '../data/model';
import { tvPlaneArr, stageThumbArr, stageVideoArr } from '../data/modalInfo'; //, TVPlane
const initTopLight = 1.5, initAmbLight = 0.5, initMainLight = 0.5, initTopPos = {x:-2, y:3, z:-2}, renderId = 'container'; // render2d
const fovNor = 60, fovMax = 75, fovMin = 35, camTime = 500, modelScl = 0.25, stageVideoSize={w:1365, h:500};
const tvBackSrcArr = ['life', 'industry', 'structure'];

export default class CanvasComponent extends React.Component {
	constructor(props) {
		super(props);
		this.backMapArr = []; this.loadArr = [];  this.convertArr = [];
		this.hotArr = []; this.lineArr = []; this.tvStageArr = []; this.tvBackArr = []; this.overHotMesh = null;
		this.raycaster = new THREE.Raycaster(); this.mouse = new THREE.Vector2(); this.extHotWidth = 70;
		this.state = {pageKey:props.pageKey, selSpace:props.selSpace, expand:props.expand, selScene:props.selScene, lightMode:props.lightMode};
	}

	componentDidMount() {
		this.setCanvasSize();
		this.initScene();
		this.loadModel();
		this.animate();
		window.addEventListener('resize', this.setCanvasSize);
		document.getElementById(renderId).addEventListener('mousemove', this.onMouseMove);
		document.getElementById(renderId).addEventListener('click', this.onClickWindow);
		document.getElementById(renderId).addEventListener('touchend', this.onClickWindow);
		document.getElementById(renderId).addEventListener('wheel', this.onScroll);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (this.state.pageKey !== nextProps.pageKey) {
			this.setState({pageKey:nextProps.pageKey});
		}
		if (this.state.expand !== nextProps.expand) {
			this.setState({expand:nextProps.expand})
		}
		if (this.state.selScene !== nextProps.selScene) {
			this.setSceneModel(nextProps.selScene, 'header');
		}
	}

	onScroll = (e) => {
		if (!this.camera) return;
		const fov = this.camera.fov + e.deltaY * 0.02
		this.camera.fov = THREE.MathUtils.clamp(fov, fovMin, fovMax)
		this.camera.updateProjectionMatrix();
	}

	onClickWindow = (e) => {
		const {selScene} = this.state;
		// console.log(this.camera);
		// console.log(this.controls.getAzimuthalAngle());
		if (this.props.browType==='mobile') {
			const interHot = this.getHotObject(e);
			this.overHotMesh = interHot?interHot.object:null;
		}
		if (!this.overHotMesh) {
			const stageVideoButton = jQuery(e.target).closest('.stage-video-button')[0];
			const stageBackButton = jQuery(e.target).closest('.stage-back-button')[0];
			if (stageVideoButton) {
				stageVideoButton.classList.forEach(str => {
					if (str.includes('stageVideo')) this.showStageVideo(str);
				});
			} else if (stageBackButton) {
				this.showStageVideo();
			}
			return;
		}
		const {hotType, hotKey} = this.overHotMesh;
		if (this.overHotMesh.hotMethod === 'goto') {
			this.setSceneModel(hotType, 'canvas')
		} else {
			this.props.openObjectModal(hotType, hotKey);
			this.closeHotOver();
		}
	}

	closeHotOver = () => {
		this.overHotMesh = null;
	}

	onMouseMove = (e) => {
		if (this.controlChange) return;
		const interHot = this.getHotObject(e);
		if (interHot) {
			jQuery('#'+renderId).css({cursor:'pointer'});
			const {object} = interHot;
			this.overHotMesh = object;
		} else {
			jQuery('#'+renderId).css({cursor:'default'});
			if (this.overHotMesh) this.closeHotOver();
		}
	}

	getHotObject = (e) => {
		if (!this.hotArr || !this.hotArr.length) return;
		var posX, posY;
		if (this.props.browType === 'web') {posX = e.clientX; posY = e.clientY;}
		else {
			if (!e.touches && !e.changedTouches) return;
			const touch = e.touches[0] || e.changedTouches[0];
			posX = touch.pageX; posY = touch.pageY;
		}
		const hotArr = this.hotArr.filter(hotItem=>hotItem.visible===true);
		this.mouse.x = ( posX / this.cWidth ) * 2 - 1;
		this.mouse.y = - ( posY / this.cHeight ) * 2 + 1;
		this.raycaster.setFromCamera( this.mouse, this.camera );
		return this.raycaster.intersectObjects( hotArr )[0];
	}

	setSceneModel = (newKey, clickType) => {
		const oldKey = this.state.selScene, newExterImg = newKey.includes('exter')?newKey:null;
		this.setHotDisplay();
		if (newExterImg) this.setState({exterImg:newExterImg}, ()=>this.setState({extShow:true}));
		else setTimeout(() => {
			this.setState({extShow:false}, ()=> {
				setTimeout(() => { this.setState({exterImg:null}) }, 500)
			})
		}, 500);
		this.setState({selScene:newKey}, () => {
			this.props.setSelScene(newKey);
			if (newExterImg) {
				var posX = 0, posY = 0;
				if (newKey==='exterior') {posX = 55; posY = 55;}
				else if (newKey==='exter_1') {posX = 30; posY = 30;}
				else if (newKey==='exter_2') {posX = 40; posY = 55;}
				jQuery('#exterHotImg').css({top:posY+'vh', left:posX+'vw'});
				// jQuery('#render2dWrapper').css({zIndex:'-1'});
			} // else jQuery('#render2dWrapper').css({zIndex:'0'});
			return;
		});
		this.controls.maxAzimuthAngle = Infinity; this.controls.minAzimuthAngle = -Infinity;

		const newMat = this.backMapArr.find(mapItem=>mapItem.sceneKey===newKey);
		this.newMesh.material = newMat; // this.newMesh.material.needsUpdate = true;
		this.newMesh.material.opacity = 1; this.newMesh.material.transparent = false;
		this.oldMesh.material.opacity = 1; this.oldMesh.material.transparent = true;
		setTimeout(() => {
			this.transScene(clickType, newMat);
		}, 200);

		// this.hotArr.forEach(hotItem => { hotItem.visible = hotItem.hotScene===newKey});
		// this.hideRender2D();
		// this.showRender2D(selScene);
	}

	transScene = (clickType, newMat) => {
		const delFov = camTime;
		if (!delFov) SetTween(this.camera, 'fov', fovMax, camTime);
		setTimeout(() => {
			SetTween(this.camera, 'position', newMat.camPos, camTime);
			SetTween(this.camera, 'fov', newMat.camPos.fov || fovNor, camTime);
		}, camTime - delFov);
		setTimeout(() => {
			SetOpacity(this.oldMesh, 0, camTime);
		}, camTime * 1 - delFov); // SetTween(oldScene, 'opactiy', 0, camTime); 
		setTimeout(() => {
			this.oldMesh.material = newMat; this.oldMesh.material.opacity = 1;
			// SetTween(this.camera, 'fov', fovNor, camTime);
		}, camTime * 2 - delFov);
		setTimeout(() => { this.setHotDisplay(this.state.selScene); }, camTime * 4 - delFov);

		setTimeout(() => {
			if (newMat.camPos.azimuth) {
				this.controls.maxAzimuthAngle = newMat.camPos.azimuth.max;
				this.controls.minAzimuthAngle = newMat.camPos.azimuth.min;
			}
		}, camTime * 3);
	}

	setHotDisplay = (selScene) => {
		[this.hotArr, this.lineArr, this.tvStageArr, this.tvBackArr].forEach((arr,idx) => {
			if (this.props.iOSType && (idx === 2 || idx === 3)) return;
			arr.forEach(item => { item.visible = item.hotScene===selScene; });
		});
		tvBackSrcArr.forEach(sceneKey => {
			// if (item.key==='mobility') return;
			const video = document.getElementById( 'tvBackVideo'+sceneKey );
			if (!video) return;
			if (sceneKey!==selScene) {video.pause();}
			else {video.currentTime = 0; video.play();}
		});
		const videoArr = document.getElementsByClassName('tvMain'+selScene);
		if (videoArr.length && videoArr[1]) { videoArr[1].play(); }
	}

	hideRender2D = () => {
		jQuery('#render2d').css({opacity:0});
	}

	showRender2D = (selScene) => {
		if (selScene !== 'balance' || this.posTarget !== 0) return;
		// jQuery('#render2d').css({opacity:1});
		const videoDiv = document.getElementById("videoBalanceTV");
		videoDiv.play();
		this.videoMesh.visible = true;
	}

	addRender2d = (meshArr) => {
		meshArr.forEach(meshItem => {
			const divSize = meshItem.hotKey.split('-'), pos = meshItem.position, rot = meshItem.rotation, divId = meshItem.hotType==='stage'?'tv-stage-source':'tvPlane_'+meshItem.hotScene+'_main';
			const divSource = document.getElementsByClassName(divId);
			var wrapper = document.createElement('div');
			wrapper.classList.add("tvPlane");
			wrapper.innerHTML = divSource[0].innerHTML;
			var divScale = divSize[2]*3/ 10;
			if (meshItem.hotType==='stage') {
				wrapper.id = meshItem.name;
				wrapper.classList.add("tv-stage-wrapper");
				wrapper.classList.add("flex");

				wrapper.style.width = stageVideoSize.w+'px';
				wrapper.style.height = stageVideoSize.h+'px';

				divScale = stageVideoSize.w / parseInt(divSize[0]);
			} else {
				wrapper.id = divId;
				const wrapperWidth = parseInt(divSize[0]) * divScale; wrapper.style.width = wrapperWidth + 'px';
				const wrapperHeight = parseInt(divSize[1]) * divScale; wrapper.style.height = wrapperHeight  + 'px';
			}

			const object = new CSS3DObject(wrapper);
			object.hotScene = meshItem.hotScene;
			object.position.set( pos.x * divScale * 10, pos.y * divScale * 10 + 105, pos.z * divScale * 10);
			object.rotation.set( rot.x, rot.y, rot.z);

			// this.totalGroup.add(object);
			// this.tvStageArr.push(object);
		});
	}

	setCamControl = (camPos, stopLoading) => {
		this.camera.position.set(camPos.x, camPos.y, camPos.z);
		if (!stopLoading) setTimeout(() => { this.props.setLoading(false); }, 0);
	}

	initScene = () => {
		this.renderer = new THREE.WebGLRenderer({antialias:true});
		this.renderer.setSize(this.cWidth, this.cHeight);
		if (!document.getElementById("container")) return false;
		document.getElementById("container").appendChild(this.renderer.domElement);

		// this.renderer.setPixelRatio( 2 );
		this.renderer.setClearColor(0x000000, 1);

		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(fovNor, this.cWidth / this.cHeight, 0.01, 100);
		
		this.totalGroup = new THREE.Group(); this.scene.add(this.totalGroup);
		const sphereGeo = new THREE.SphereGeometry(30, 64, 64), sphereMat = new THREE.MeshBasicMaterial();
		this.oldMesh = new THREE.Mesh(sphereGeo, sphereMat); this.newMesh = new THREE.Mesh(sphereGeo, sphereMat);
		this.oldMesh.scale.set(-0.9, 0.9, 0.9); this.newMesh.scale.x = -1;
		this.totalGroup.add(this.oldMesh); this.totalGroup.add(this.newMesh);

		// this.render2d = new CSS3DRenderer();
		// this.render2d.setSize( this.cWidth, this.cHeight );
		// this.render2d.domElement.id='render2d';
		// const render2d = document.getElementById('render2dWrapper');
		// render2d.appendChild( this.render2d.domElement );

		this.controls = new OrbitControls(this.camera, this.renderer.domElement); // render2d.domElement
		this.controls.enableZoom = false;
		this.controls.addEventListener('start', () => { this.controlChange = true; });
		this.controls.addEventListener('end', () => this.controlChange = false);
		this.controls.enablePan = false; this.controls.enableZoom = false;
		this.controls.minPolarAngle = 0.5; this.controls.maxPolarAngle = Math.PI / 2 + 0.5;

		this.ambientLight = new THREE.AmbientLight(0xFFFFFF, initAmbLight); this.scene.add(this.ambientLight);
		this.topLight = new THREE.DirectionalLight(0xFFFFFF, initTopLight * 1 ); this.scene.add( this.topLight );
		this.topLight.position.set(initTopPos.x, initTopPos.y, initTopPos.z);
		this.mainLight = new THREE.DirectionalLight(0xFFFFFF, initMainLight); this.scene.add(this.mainLight); this.mainLight.position.set(5, 5, 5);
	}

	getBasicMat = (img, repeatX) => {
		const map = new THREE.TextureLoader().load(img);
		if (repeatX) map.repeat.x = repeatX;
		return new THREE.MeshBasicMaterial({map, transparent:true, side:2});
	}

	loadModel = () => {
		var self = this;
		const hotMat = this.getBasicMat(imgHotspot), lineMat = this.getBasicMat(imgLine, 0.5);
		const hotMatRed = this.getBasicMat(imgHotRed), hotMatYellow = this.getBasicMat(imgHotYellow);
		const hotMatGreen0 = this.getBasicMat(imgHotGreen0), hotMatGreen1 = this.getBasicMat(imgHotGreen1), hotMatGreen2 = this.getBasicMat(imgHotGreen2);
		// const hotTVMat = new THREE.MeshBasicMaterial({transparent:true, color:0xFF0000, opacity:0.5});
		const gotoMat = new THREE.MeshBasicMaterial({color:0xFF0000});
		const stageVideo = document.getElementById('tvStageVideo'); stageVideo.play();
		const stageTVMat = new THREE.MeshBasicMaterial({map:new THREE.VideoTexture( stageVideo )});
		// const tvPlaneArr = [];
		var totalCount = 0, loadedCount = 0;
		new FBXLoader().load( modelHotspot, (object) => {
			object.children.forEach(child => {
				// if (!child.name.includes('hotspot')) return;
				const hotInfo = child.name.split('_');
				const hotMethodInfo = hotInfo[0].split('-');
				child.hotMethod = hotMethodInfo[0];
				child.hotScene = hotInfo[1];
				child.hotType = hotInfo[2];
				child.hotKey = hotInfo[3];
				child.hotInfo = hotInfo;
				if (child.hotMethod==='goto') {child.material = gotoMat; child.visible = false; this.hotArr.push(child)}
				else if (child.hotMethod==='line') {
					child.material = lineMat; this.lineArr.push(child); child.visible = false;
				} else if (child.hotMethod==='hotspot') {
					if (hotMethodInfo[1] === 'demo') {
						// if (hotMethodInfo[2] === 'red') child.material = hotMatRed;
						// else if (hotMethodInfo[2] === 'yellow') child.material = hotMatYellow;
						// else if (hotMethodInfo[2] === 'green') {
						// 	if 		(hotMethodInfo[3]==='0') child.material = hotMatGreen0;
						// 	else if (hotMethodInfo[3]==='1') child.material = hotMatGreen1;
						// 	else if (hotMethodInfo[3]==='2') child.material = hotMatGreen2;
						// }
					} else child.material = hotMat;
					this.hotArr.push(child); child.visible = false;
				} else if (child.hotMethod==='tvPlane') {
					child.material = stageTVMat;
					this.tvStageArr.push(child); child.visible = false;
				} else if (child.hotMethod==='tvBack') {
					const video = document.getElementById( 'tvBackVideo'+child.hotScene );
					child.material = new THREE.MeshBasicMaterial({map:new THREE.VideoTexture( video )})
					child.material.needsUpdate = true;
					this.tvBackArr.push(child); child.visible = false;
				}
			});
			object.scale.set(modelScl, modelScl, modelScl);
			this.totalGroup.add(object);
			// this.addRender2d(tvPlaneArr);
		}, (xhr) => { }, (error) => { console.log(error); } );
	
		Image.prototype.load = function(url, idx, sceneInfo) {
			var xmlHTTP = new XMLHttpRequest();
			xmlHTTP.open('GET', url,true);
			xmlHTTP.responseType = 'arraybuffer';
			xmlHTTP.onload = function(e) {
				const blob = new Blob([this.response]);
				const imgSrc = window.URL.createObjectURL(blob);
				new THREE.TextureLoader().load(imgSrc, ( backMap ) => {
					backMap.minFilter = THREE.LinearFilter;
					backMap.magFilter = THREE.LinearFilter;
					backMap.anisotropy = 16;
					const backMat = new THREE.MeshBasicMaterial({side: 2, transparent:true, opacity:0, map:backMap}); backMat.sceneKey = sceneInfo.key; backMat.camPos = sceneInfo.camPos;
					self.backMapArr.push(backMat);
					loadedCount++;

					if (loadedCount===totalCount) { self.addBackMesh();}
				}, (xhr) => { self.setConvertCheck(idx, xhr.total, xhr.loaded);
				}, (err) => { console.log( 'Failed to convert to map-texture.' ); } );
			};
			xmlHTTP.onprogress = function(e) { self.setLoadCheck(idx, e.total, e.loaded); };
			xmlHTTP.onloadstart = function() {};
			xmlHTTP.send();
		};

		const preStr = this.props.browType==='mobile'?'small_':''; // window.innerWidth<1280 || 
		sceneArr.filter(item=>{return item.backImg;}).forEach((sceneInfo, idx) => {
			this.setLoadCheck(idx, 1, 0);
			this.setConvertCheck(idx, 1, 0);
			totalCount++;
			var img = new Image();
			img.load('./backImage/'+ preStr + sceneInfo.backImg+'.jpg', idx, sceneInfo);
			// img.load('./backImage/test.jpg', idx, sceneInfo);
		});
	}

	addBackMesh = () => {
		setTimeout(() => {
			this.props.setSelScene(sceneArr[0].key);
		}, camTime * 2);
	}

	setLoadCheck = (idx, total, loaded) => {
		this.loadArr[idx] = {total, loaded};
		this.props.setLoadPro(this.loadArr);
	}
	setConvertCheck = (idx, total, converted) => {
		this.convertArr[idx] = {total, converted};
		this.props.setConvertPro(this.convertArr);
	}

	setCanvasSize = () => {
		if (window.innerWidth < window.innerHeight)  return;
		this.cWidth = window.innerWidth;
		this.cHeight = window.innerHeight;
		// if (this.props.browType==='mobile') this.cHeight -= 55;
		if (this.renderer && this.camera) {
			this.renderer.setSize(this.cWidth, this.cHeight);
			// this.render2d.setSize(this.cWidth, this.cHeight);
			this.camera.aspect = this.cWidth/this.cHeight;
			this.camera.updateProjectionMatrix();
		}
		this.extHotWidth = Math.min(parseInt(window.innerHeight * 0.1), 70);
	}

	setLineAnimate = () => {
		this.lineArr.forEach((lineItem, idx) => {
			if (!lineItem.visible) return;
			lineItem.material.map.offset.x -= 0.001;
			if (lineItem.material.map.offset.x < 0) lineItem.material.map.offset.x = 0.5;
		});
	}

	animate=()=>{
		if (!this.camera || !this.scene) return;
		requestAnimationFrame(this.animate);
		this.camera.lookAt( 0, 0, 0 );
		this.renderer.render(this.scene, this.camera);
		// this.render2d.render(this.scene, this.camera);
		this.camera.updateProjectionMatrix();
		this.setLineAnimate();
	}

	onClickTVHotButton = (str) => {
		console.log(str);
	}

	onClickExterButton = () => {
		this.props.openObjectModal('sub', this.state.selScene+'modal');
	}

	showStageVideo = (stageVideoKey) => {
		jQuery('.stage-video-back').css({zIndex:stageVideoKey?0:-1});
		jQuery('.stage-video-item').css({zIndex:-1});
		jQuery('.stage-video-item').trigger('pause');
		jQuery('.stage-back-button').css({top:stageVideoKey?'-40px':'10px'});
		const videoArr = document.getElementsByClassName('stage-video-item');
		for (let i = 0; i < videoArr.length; i++) {
			const element = videoArr[i];
			element.currentTime = 0;
		}
		if (stageVideoKey) {
			jQuery('.'+stageVideoKey).css({zIndex:0});
			jQuery('.'+stageVideoKey).trigger('play');
		}
	}

	render() {
		const {pageKey, selScene, exterImg, extShow} = this.state;
		return (
			<div className={`back-board canvas ${pageKey==='canvas'?'active':''}`}>
				{/* {exterImg && */}
					<div className={`exter-back ${exterImg?'zShow':''} ${extShow?'active':''}`} style={{backgroundImage:exterImg?'url(./backImage/'+exterImg+'.jpg)':'none'}}>
						<img src={imgHotspot} id='exterHotImg' onClick={this.onClickExterButton} style={{width:this.extHotWidth+'px', height:this.extHotWidth+'px'}}></img>
					</div>
				{/* } */}
				{tvBackSrcArr.map((tvKey, tvIdx )=>
					<React.Fragment key={tvIdx}>
						{/* <TVPlane classStr='tv-plane-source' showButton={true} tvKey={tvItem.key} buttons={tvItem.buttons} onClickButton={()=>this.onClickTVHotButton(tvItem.key)}></TVPlane> */}
						<video className='tv-plane-source' id={`tvBackVideo${tvKey}`} src={`./videos/tv_back/${(window.innerWidth<1280||this.props.browType==='mobile')?'small_':''}${tvKey}.mp4`} muted={true} loop></video>
					</React.Fragment>
				)}
				<video className='tv-plane-source' id={`tvStageVideo`} src={`./videos/tv_back/${(this.props.browType==='mobile')?'small_':''}stage_tv_main.mp4`} muted={true} loop></video>
				{/* window.innerWidth<1280|| */}
				<div className='tv-plane-source tv-stage-source'>
					<div className='tv-stage-outer flex'>
						<div className='tv-stage-back stage-main-back multi-modal-content flex'>
							{stageThumbArr.map((rowItem, rowIdx) =>
								<div className='multi-row flex' key={rowIdx}>
									{rowItem.map((item, idx) =>
										<div className={`sub-item flex stage-video-button ${item.key}`} key={idx}>
											<div className='sub-image'><img src={item.thumb}></img></div>
											<div className='sub-label'>{item.label}</div>
										</div>
									) }
								</div>
							) }
						</div>
						<div className='tv-stage-back stage-video-back'>
							{stageVideoArr.map((item, idx) =>
								<video className={`stage-video-item ${item.key}`} src={item.videoUrl} key={idx} width={stageVideoSize.w/2} height={stageVideoSize.h/2} controls></video>
							) }
							<div className='back-button flex stage-back-button'>
								<img src={imgChevron}></img>
								<label> Back</label>
							</div>
						</div>
					</div>
				</div>
				<div id='container' className='canvas'></div>
				{/* <div className='render-2d' id='render2dWrapper'></div> */}
				<div className='hot-wrapper' id='hotWrapper'>
					<div className='hot-inner' id='hotInner'>
						<label id='hotLabel'></label>
						<div className='hot-arrow'></div>
					</div>
				</div>
			</div>
		);
	}
}
