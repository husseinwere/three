import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

const renderer = new THREE.WebGLRenderer()

renderer.shadowMap.enabled = true
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
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = 0.5 * Math.PI
plane.receiveShadow = true

const gridHelper = new THREE.GridHelper(20)
scene.add(gridHelper)

const sphereGeometry = new THREE.SphereGeometry(2, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff, wireframe: false })
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-5, 3, 0)
sphere.castShadow = true

const ambientLight = new THREE.AmbientLight(0x777777)
scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// scene.add(directionalLight)
// directionalLight.position.set(-20, 30, 0)
// directionalLight.castShadow = true
// directionalLight.shadow.camera.bottom = -10

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(dLightHelper)

// const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(dLightShadowHelper)

const spotLight = new THREE.SpotLight(0xffffff, 1, undefined, undefined, undefined, 0)
scene.add(spotLight)
spotLight.position.set(-30, 30, 0)
spotLight.castShadow = true
spotLight.angle = 0.2

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

const gui = new dat.GUI()
const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    intensity: 1,
    penumbra: 0,
    decay: 0
}
gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e)
})
gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e
})
gui.add(options, 'speed', 0, 0.1)
gui.add(options, 'angle', 0, 1)
gui.add(options, 'intensity', 0, 1)
gui.add(options, 'penumbra', 0, 1)
gui.add(options, 'decay', 0, 1)

let step = 0

function animate(time) {
    box.rotation.x = time / 1000
    box.rotation.y = time / 1000

    step += options.speed
    sphere.position.y = 5 * Math.abs(Math.sin(step))

    spotLight.angle = options.angle
    spotLight.intensity = options.intensity
    spotLight.penumbra = options.penumbra
    spotLight.decay = options.decay
    spotLightHelper.update()

    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)