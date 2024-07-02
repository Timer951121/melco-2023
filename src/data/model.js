
import * as THREE from 'three';
import {Tween, autoPlay, Easing} from "es6-tween";

autoPlay(true);

export const controlHome = {azimuth:{max:1.7858, min:1.5858}, polar:{max:1.84, min:1.20}};
export const initPlaneMetal = 0.3;
const subInfoMobility = {menuKey:'mobility', subArr:['mobility', 'middle4', 'middle3', 'middle2', 'middle1'], nextKey:'structure', beforeKey:'welcome'}
const subInfoLife = {menuKey:'life', subArr:['life', 'next100'], nextKey:'industry', beforeKey:'industry'} // , 'stage'
const subInfoExter = {menuKey:'exterior', subArr:['exterior', 'exter_1', 'exter_2']}
export const sceneArr = [
	{ key: 'welcome', backImg:'welcome', backRot: 0, camPos: { x: 0.004, y:-0.004, z: -0.1, azimuth:{min:0.45, max:-3} }, menuLabel:'Welcome', menuKey:'welcome'},
	{ key: 'mobility', backImg:'mobility', backRot: 0, camPos: { x: 0.07, y: 0, z: 0.12, azimuth:{min:0.45, max:-3} }, menuLabel:'Mobility',  menuKey:'mobility', subInfo:subInfoMobility},
	{ key: 'structure', backImg:'structure', backRot: 0, camPos: { x: -0.09, y: 0.018777, z: -0.0356, fov:75 }, menuLabel:'Infrastructure',  menuKey:'structure'},
	{ key: 'industry', backImg:'industry', backRot: 0, camPos: { x: -0.075, y: 0.03, z: -0.0987, fov:75 }, menuLabel:'Industry',  menuKey:'industry'},
	{ key: 'life', backImg:'life', backRot: 0, camPos: { x: -0.0185, y: 0.02, z: -0.1368, fov:60 }, menuLabel:'Life',  menuKey:'life', subInfo:subInfoLife},
	{ key: 'next100', backImg:'next100', backRot: 0, camPos: { x: -0.1059, y: -0.00346, z: 0.0019, fov:75 }, testLabel:'Life 1',  menuKey:'life', subInfo:subInfoLife},
	{ key: 'sustain', backImg:'sustain', backRot: 0, camPos: { x: 0.05936, y: -0.0055, z: 0.0876, fov:75 }, menuLabel:'Sustainability',  menuKey:'sustain'},
	{ key: 'stage', backImg:'stage', backRot: 0, camPos: { x: 0.12, y: 0, z: -0.08, fov:75 }, menuLabel:'Stage',  menuKey:'stage'},
	{ key: 'exterior', backImg:'exterior', backRot: 0, camPos: { x: -0.02, y: 0, z: -0.14 }, menuLabel:'Exterior',  menuKey:'exterior', subInfo:subInfoExter},
	{ key: 'exter_1', backImg:'exter_1', backRot: 0, camPos: { x: -0.1, y: -0.1, z: 0.1 }, testLabel:'Exterior 1',  menuKey:'exterior', subInfo:subInfoExter},
	{ key: 'exter_2', backImg:'exter_2', backRot: 0, camPos: { x: -0.1, y: -0.1, z: 0.1 }, testLabel:'Exterior 2',  menuKey:'exterior', subInfo:subInfoExter},
	{ key: 'begin', backImg:'begin', backRot: 0, camPos: { x: 0.08, y: 0, z: -0.12 }, testLabel:'Begin',  menuKey:'begin'},
	{ key: 'middle4', backImg:'middle_autonomous', backRot: 0, camPos: { x: 0.078, y: -0.005, z: 0.0688, fov:75 }, testLabel:'Mobility 4',  menuKey:'mobility', subInfo:subInfoMobility},
	{ key: 'middle3', backImg:'middle_assistance', backRot: 0, camPos: { x: 0.047, y: 0.013, z: 0.0916, fov:75 }, testLabel:'Mobility 3',  menuKey:'mobility', subInfo:subInfoMobility},
	{ key: 'middle2', backImg:'middle_distribution', backRot: 0, camPos: { x: 0.00237, y: 0.0178, z: 0.10323, fov:75 }, testLabel:'Mobility 2',  menuKey:'mobility', subInfo:subInfoMobility},
	{ key: 'middle1', backImg:'middle_wheel', backRot: 0, camPos: { x: -0.0296, y: -0.0011, z: 0.0984, fov:75 }, testLabel:'Mobility 1',  menuKey:'mobility', subInfo:subInfoMobility},
]

export function SetTween(obj, attr, info, easeTime) {
	if (!obj) return;
	var tweenData = {};
	const easeType = Easing.Cubic.InOut;
	if 		(attr === "opacity") {tweenData = {'opacity':info };}
	else if (attr === "position") tweenData = {'position.x':info.x, 'position.y':info.y, 'position.z':info.z };
	else if (attr === "intensity") tweenData = {'intensity':info };
	else if (attr === "scale") tweenData = {'scale.x':info.x, 'scale.y':info.y, 'scale.z':info.z };
	else if (attr === "fov") tweenData = {'fov':info };
	// else if (attr === "color") tweenData = {'r': info, 'g':info, 'b':info};
	new Tween(obj).to( tweenData , easeTime ).easing(easeType).start();
}

export function SetOpacity(mesh, target, time) {
	if (!mesh) return;
	const count = 10, intTime = Math.round(time / count);
	const oldOpa = mesh.material.opacity, intOpa = (target - oldOpa) / count;
	for (let i = 0; i < count; i++) {
		setTimeout(() => { mesh.material.opacity += intOpa; }, intTime * i);
	}
}

export function GetBackMesh (info) {
	const sphereGeo = new THREE.SphereGeometry(30, 64, 64);
	const sphereMat = new THREE.MeshBasicMaterial({side: 2, transparent:true, opacity:0, color:0x666666}); // , map:info.backMap
	const backMesh = new THREE.Mesh(sphereGeo, sphereMat);
	// backMesh.material.opacity = 0;
	backMesh.scale.x = -1; backMesh.sceneKey = info.key; backMesh.camPos = info.camPos;
	return backMesh;
}

export function Get2DPos(obj, cWidth, cHeight, camera) {
	var vector = new THREE.Vector3();
	var widthHalf = 0.5 * cWidth;
	var heightHalf = 0.5 * cHeight;
	obj.updateMatrixWorld();
	vector.setFromMatrixPosition(obj.matrixWorld);
	vector.project(camera);
	vector.x = ( vector.x * widthHalf ) + widthHalf;
	vector.y = - ( vector.y * heightHalf ) + heightHalf;
	return {  x: vector.x, y: vector.y };
};

export function CustomModel(object, modelItem) {
	const vPos = new THREE.Box3().setFromObject(object), vSize = vPos.getSize(new THREE.Vector3()), scl = 5 / Math.max(vSize.x, vSize.z);
	object.modelKey = modelItem.key; object.topLight = modelItem.topLight;
	object.scale.set(scl, scl, scl);
	object.vSize = vSize; object.scl = scl; object.hotPosY0 = modelItem.hotPosY0;
	object.traverse(child => {
		if (child instanceof THREE.Mesh) {
		}
	})
	return object;
}
