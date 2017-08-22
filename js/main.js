const state = () => {
  const camera = makeCamera()
  const scene = makeScene()
  const config = buildContainer()
  window.addEventListener( 'resize', onWindowResize(camera, config.renderer), false )
  return Object.assign({}, config, { camera, scene })
}

const makeCamera = () => {
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.y = 400
  return camera
}

const buildContainer = () => {
  const container = document.createElement( 'div' )
  document.body.appendChild( container )

  const stats = makeStats()
  const renderer = makeRenderer()
  container.appendChild( renderer.domElement )
  container.appendChild( stats.dom )
  return {stats, renderer}
}

const makeRenderer = () => {
  const renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  return renderer
}
const makeStats = () => new Stats()

const makeScene = () => {
  const scene = new THREE.Scene();
  scene.add( new THREE.AmbientLight( 0x404040 ) );
  const light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0, 1, 0 );
  scene.add( light );
  makeGeometries(scene)  
  return scene
}

const makeGeometries = scene => {
  right = getRandomGeometry()
  right.position.set( -400, 0, -75 );
  right.rotation.x = -1.5;
  scene.add( right );
  left = right.clone();
  left.position.set( -400, 0, 75 );
  left.rotation.x = 1.5;
  scene.add( left );
  up = right.clone()
  up.position.set( -400, 75, 0 );
  up.rotation.x = 0	;
  scene.add( up );
  down = right.clone()
  down.rotation.x = 3.1	;
  down.position.set( -400, -75, 0 );
  scene.add( down );
}

const getTexture = () => {
  const map = new THREE.TextureLoader().load( 'textures/text' + Math.floor((Math.random() * 21) + 1) + '.jpg' );
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 16;
  return new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );  
}

const getRandomGeometry = () => {
  const geometries = [
    new THREE.TorusKnotGeometry( 10, 5, 50, 20 ),
    new THREE.SphereGeometry( 25, 20, 10 ),
    new THREE.IcosahedronGeometry( 20, 0),
    new THREE.OctahedronGeometry( 20, 0 ),
    new THREE.TetrahedronGeometry( 20, 0 ),
    new THREE.PlaneGeometry( 50, 50, 4, 4 ),
    new THREE.BoxGeometry( 35, 35, 35, 4, 4, 4 ),
    new THREE.CircleGeometry( 30, 20, 0, Math.PI * 2 ),
    new THREE.RingGeometry( 5, 30, 20, 5, 0, Math.PI * 2 ),
    new THREE.CylinderGeometry( 10, 30, 40, 40, 5 ),
    new THREE.TorusGeometry( 20, 10, 20, 20 ),
    new THREE.CircleGeometry( 30, 20, 0, Math.PI * 2 ),
  ]
  const geometry = geometries[Math.floor(Math.random() * geometries.length)]
  const material = getTexture()

  return new THREE.Mesh( geometry, material )
}

const onWindowResize = (camera, renderer) => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize( window.innerWidth, window.innerHeight )
}

const animate = config => {
  requestAnimationFrame( () => animate(config) )
  render(config.camera, config.scene, config.renderer)
  config.stats.update()
}

const rotate = scene => {
  scene.children.map(obj => {
      obj.rotation.z += 0.05
      obj.rotation.y += 0.01
  })
  return scene
}
const render = (camera, scene, renderer) => {
  camera.position.x = 60;
  camera.position.y = 0;
  camera.position.z = 0;
  camera.lookAt( scene.position );
  scene = rotate(scene);
  renderer.render( scene, camera );
}

animate(state())