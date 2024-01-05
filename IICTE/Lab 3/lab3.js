import * as THREE from '../../js/three/three.module.js';
import {ARButton} from '../../js/three/ARButton.js';


document.addEventListener("DOMContentLoaded", () => {
	//основна функція
	const initialize = async() => {
		// створення сцени
		let scene = new THREE.Scene();
			scene.position.set(0, -2, -15);
		
	    let camera = new THREE.PerspectiveCamera();

		let renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true
		});
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    renderer.setPixelRatio(window.devicePixelRatio);
		document.body.appendChild(renderer.domElement);
		
		// Створюємо циліндр
		var geometry = new THREE.CylinderGeometry(1, 1, 2, 64);
		var textureLoader = new THREE.TextureLoader();
		var Texture = textureLoader.load("hardwood2_diffuse.jpg");
		var material = new THREE.MeshBasicMaterial({map: Texture});
		var cylinder = new THREE.Mesh(geometry, material);
		cylinder.rotation.x = Math.PI / 2;
		cylinder.position.x = 3;
		cylinder.position.y = 3;
		scene.add(cylinder);
		
		// Створюємо площину
		var planeGeometry = new THREE.PlaneGeometry(10, 10);
		var planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.rotation.x = Math.PI / 2;
		plane.rotation.y = Math.PI / 6;
		scene.add(plane);
		
		// Функція для створення векторів
		function createVector(x, y, z, color) {
		  var origin = new THREE.Vector3(0, 0, 0);
		  var direction = new THREE.Vector3(x, y, z);
		  var arrow = new THREE.ArrowHelper(direction.normalize(), origin, direction.length()*2, color);
		  return arrow;
		}

		// Створюємо вектори
		var Fg = createVector(0, -2, 0, 0xff0000);
		Fg.position.set(3, 3, 0);
		var N = createVector(0, 2 * Math.cos(Math.PI / 6), 0, 0x0000ff);
		N.position.set(3, 3, 0);
		var Ff = createVector(-2 * Math.sin(Math.PI / 6), 0, 0, 0x00ffff);
		Ff.position.set(3, 3, 0);
		var R = createVector(0, 2 * Math.cos(Math.PI / 6) - 2 * Math.sin(Math.PI / 6), 0, 0xff00ff);
		R.position.set(3, 3, 0);

		// Додаємо вектори
		scene.add(Fg);
		scene.add(N);
		scene.add(Ff);
		scene.add(R);

		
		function render() {
			if (cylinder.position.x <= 3 && cylinder.position.x >= -3 && cylinder.position.y <= 3 && cylinder.position.y >= -3)
			{
				cylinder.position.set(cylinder.position.x-0.005, cylinder.position.y-0.003, cylinder.position.z);
				Fg.position.set(Fg.position.x-0.005, Fg.position.y-0.003, Fg.position.z);
				N.position.set(N.position.x-0.005,   N.position.y-0.003,  N.position.z);
				Ff.position.set(Ff.position.x-0.005, Ff.position.y-0.003, Ff.position.z);
				R.position.set(R.position.x-0.005,   R.position.y-0.003,  R.position.z);
			}
			else
			{
				cylinder.position.set(3, 3, cylinder.position.z);
				Fg.position.set(3, 3,Fg.position.z);
				N.position.set(3, 3,N.position.z);
				Ff.position.set(3, 3,Ff.position.z);
				R.position.set(3, 3,R.position.z);
			}
			cylinder.rotation.y += 0.005;
			
			renderer.render(scene, camera);
		}
		
		
		var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        scene.add(light);
				

		// повідомлення рушія Three.js про параметри використання WebXR
		renderer.xr.enabled = true;

		// перевірка запуску та завершення сесії WebXR
		renderer.xr.addEventListener("sessionstart", (evt) => {
			renderer.setAnimationLoop(() => {
				render();
			}); 
		});


		const arButton = ARButton.createButton(renderer, {
				optionalFeatures: ["dom-overlay"],
				domOverlay: {root: document.body},
			}
		);
		arButton.textContent = "Увійти до WebXR";
		document.body.appendChild(arButton);
	}
	
	

	initialize(); // розпочати роботу
});