import * as THREE from 'three';
import * as dat from 'dat.gui';

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Camera, Clock, Color, DirectionalLight } from 'three';
import * as SimplexNoise from 'simplex-noise';

import { choseGeo } from './util/geo_util';
import { getMaterial } from './util/mat_util';

let camera, scene, renderer, gui, controls;
let folderOne, folderTwo, folderThree, folderFour, folderFive;

let planeProperty = {
  material: 'mesh',
  type: 'basic',
  showObject: 'plane',
  planeSize: 100
};

let effectControler = {
  showObject: 'box',

  material: 'mesh',
  type: 'basic',

  boxWidht: 10,
  boxHeight: 10,
  boxDepth: 10,

  sphereRadius: 10,
  sphereWidth: 10,
  sphereHeight: 10,

  coneRadius: 32,
  coneHeight: 10,
  coneRadiusSegment: 10,

  cylinderRadiusTop: 32,
  cylinderRadiusBot: 32,
  cylinderHeight: 10,
  cylinderRadiusSegment: 10,

  torusRadius: 32,
  torusTube: 10,
  torusRadiusSegment: 10,
  torusTubularSegment: 10,

  teaPotSize: 10,
  teaPotSegments: 10,

  red: 80,
  blue: 80,
  green: 80
};

const setupMaterial = () => {
  if (folderFour !== undefined) {
    gui.removeFolder(folderFour);
  }
  folderFour = gui.addFolder('material type');
  switch (effectControler.material) {
    case 'mesh':
      folderFour.add(effectControler, 'type', ['basic', 'lambert', 'phong', 'standard']).name('mesh material').onChange( renderObject );
      break;
    case 'line':
      folderFour.add(effectControler, 'type', ['basic', 'dashed']).name('line material').onChange( renderObject );
      break;
    default:
      break;
  }
  renderObject();
}


const setupProperty = () => {
  if (folderThree !== undefined) {
    gui.removeFolder(folderThree);
  }
  folderThree = gui.addFolder('property');
  switch (effectControler.showObject) {
    case 'box':
      folderThree.add(effectControler, 'boxWidht', 0, 100).name('box widht').onChange( renderObject );
      folderThree.add(effectControler, 'boxHeight', 0, 100).name('box height').onChange( renderObject );
      folderThree.add(effectControler, 'boxDepth', 0, 100).name('box depth').onChange( renderObject );
      break;
    case 'sphere':
      folderThree.add(effectControler, 'sphereRadius', 0, 100).name('sphere radius').onChange( renderObject );
      folderThree.add(effectControler, 'sphereWidth', 0, 100).name('sphere widht').onChange( renderObject );
      folderThree.add(effectControler, 'sphereHeight', 0, 100).name('sphere height').onChange( renderObject );
      break;
    case 'cone':
      folderThree.add(effectControler, 'coneRadius', 0, 100).name('cone radius').onChange( renderObject );
      folderThree.add(effectControler, 'coneHeight', 0, 100).name('cone height').onChange( renderObject );
      folderThree.add(effectControler, 'coneRadiusSegment', 0, 100).name('cone radius segment').onChange( renderObject );
      break;
    case 'cylinder':
      folderThree.add(effectControler, 'cylinderRadiusTop', 0, 100).name('cylinder radius top').onChange( renderObject );
      folderThree.add(effectControler, 'cylinderRadiusBot', 0, 100).name('cylinder radius bottom').onChange( renderObject );
      folderThree.add(effectControler, 'cylinderHeight', 0, 100).name('cylinder height').onChange( renderObject );
      folderThree.add(effectControler, 'cylinderRadiusSegment', 0, 100).name('cylinder radius segment').onChange( renderObject );
      break;
    case 'torus':
      folderThree.add(effectControler, 'torusRadius', 0, 100).name('torus radius').onChange( renderObject );
      folderThree.add(effectControler, 'torusTube', 0, 100).name('torus tube').onChange( renderObject );
      folderThree.add(effectControler, 'torusRadiusSegment', 0, 100).name('torus radius segment').onChange( renderObject );
      folderThree.add(effectControler, 'torusTubularSegment', 0, 100).name('torus tubular segment').onChange( renderObject );
      break;
    case 'teapot':
      folderThree.add(effectControler, 'teaPotSize', 0, 100).name('teapot size').onChange( renderObject );
      folderThree.add(effectControler, 'teaPotSegments', 0, 100).name('teapot segment').onChange( renderObject );
      break;
    default:
      break;
  }
  renderObject();
}


const setupGUI = () => {
  gui = new dat.GUI({name: 'effect controler'});

  folderOne = gui.addFolder('object');
  folderOne.add(effectControler, 'showObject', ['box', 'sphere', 'cone', 'cylinder', 'torus', 'teapot']).name('object').onChange( setupProperty );
  
  folderTwo = gui.addFolder('material');
  folderTwo.add(effectControler, 'material', ['mesh', 'point', 'line']).name('draw material with').onChange( setupMaterial );

  folderFive = gui.addFolder('object color');
  folderFive.add(effectControler, 'red', 0, 255).name('red').onChange( renderObject );
  folderFive.add(effectControler, 'blue', 0, 255).name('blue').onChange( renderObject );
  folderFive.add(effectControler, 'green', 0, 255).name('green').onChange( renderObject );

  setupMaterial();
  setupProperty();
}


const renderObject = () => {
  if (scene.getObjectByName('shown_object') !== undefined) {
    scene.remove(scene.getObjectByName('shown_object'));
  }

  let showObjectMat = getMaterial(effectControler, {
    color: `rgb(${parseInt(effectControler.red)}, ${parseInt(effectControler.green)}, ${parseInt(effectControler.blue)})`
  });
  let objectGeo = choseGeo(effectControler, showObjectMat);
  objectGeo.name = 'shown_object'

  if (effectControler.showObject === 'sphere') {
    objectGeo.position.y = objectGeo.geometry.parameters.radius;
  }

  if (
    effectControler.showObject === 'box' ||
    effectControler.showObject === 'cone' ||
    effectControler.showObject === 'cylinder'
  ) {
    objectGeo.position.y = objectGeo.geometry.parameters.height/2;
  }

  if (effectControler.showObject === 'torus') {
    objectGeo.position.y = objectGeo.geometry.parameters.radius + objectGeo.geometry.parameters.tube/2;
  }

  if (effectControler.showObject === 'teapot') {
    objectGeo.position.y = 10;
  }

  scene.add(objectGeo);
}


const main = () => {
  let axesHelper = new THREE.AxesHelper( 5 );
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth/window.innerHeight,
    1,
    1000
  );

  let planeMat = getMaterial(planeProperty, {
    side: THREE.DoubleSide,
    color: 'rgb(4, 4, 4)'
  });
  let plane = choseGeo(planeProperty, planeMat);
  plane.rotation.x = Math.PI/2;

  renderObject();
  setupGUI();

  scene.add(plane);

  scene.add(camera);
  scene.add(axesHelper);

  //scene.fog = new THREE.FogExp2(0xffffff, 0.2);

  camera.position.x = 100;
  camera.position.y = 100;
  camera.position.z = 100;

  let vectorA = new THREE.Vector3(0, 0, 0);
  camera.lookAt(vectorA);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor('rgb(120, 120, 120)');
  document.getElementById('app').appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls);
}

const update = (renderer, scene, camera, controls) => {
  renderer.render(
    scene,
    camera
  );

  controls.update()

  requestAnimationFrame(function() {
    update(renderer, scene, camera, controls);
  });
}

main()