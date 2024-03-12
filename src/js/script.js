import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const renderer = new THREE.WebGLRenderer()

renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const orbit = new OrbitControls(camera, renderer.domElement)

const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

camera.position.set(0, 2, 5)
orbit.update()

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00 })
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(20, 20)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = 0.5 * Math.PI

const gridHelper = new THREE.GridHelper(20)
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(2, 50, 50)
const sphereMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: false })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-5, 3, 0)

function animate(time) {
    box.rotation.x = time / 1000
    box.rotation.y = time / 1000

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)