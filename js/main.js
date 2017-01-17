var container, stats;
var camera, scene, renderer;
init();
animate();
function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );
  camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.y = 400;
  scene = new THREE.Scene();
  var light, object;
  scene.add( new THREE.AmbientLight( 0x404040 ) );
  light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0, 1, 0 );
  scene.add( light );
  var map = new THREE.TextureLoader().load( 'textures/text' + Math.floor((Math.random() * 21) + 1) + '.jpg' );
  map.wrapS = map.wrapT = THREE.RepeatWrapping;
  map.anisotropy = 16;
  var material = new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );

  // var points = [];
  // for ( var i = 0; i < 50; i ++ ) {
  // 	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * Math.sin( i * 0.1 ) * 15 + 50, ( i - 5 ) * 2 ) );
  // }

  geometries = [
    new THREE.Mesh( new THREE.TorusKnotGeometry( 10, 5, 50, 20 ), material ),
    new THREE.Mesh( new THREE.SphereGeometry( 25, 20, 10 ), material ),
    new THREE.Mesh( new THREE.IcosahedronGeometry( 20, 0), material ),
    new THREE.Mesh( new THREE.OctahedronGeometry( 20, 0 ), material ),
    new THREE.Mesh( new THREE.TetrahedronGeometry( 20, 0 ), material ),
    new THREE.Mesh( new THREE.PlaneGeometry( 50, 50, 4, 4 ), material ),
    new THREE.Mesh( new THREE.BoxGeometry( 35, 35, 35, 4, 4, 4 ), material ),
    new THREE.Mesh( new THREE.CircleGeometry( 30, 20, 0, Math.PI * 2 ), material ),
    new THREE.Mesh( new THREE.RingGeometry( 5, 30, 20, 5, 0, Math.PI * 2 ), material ),
    new THREE.Mesh( new THREE.CylinderGeometry( 10, 30, 40, 40, 5 ), material ),
    new THREE.Mesh( new THREE.TorusGeometry( 20, 10, 20, 20 ), material ),
    new THREE.Mesh( new THREE.CircleGeometry( 30, 20, 0, Math.PI * 2 ), material ),
    // new THREE.Mesh( new THREE.LatheGeometry( points, 5 ), material )
  ]

  right = geometries[Math.floor(Math.random() * geometries.length)];
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


  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  stats = new Stats();
  container.appendChild( stats.dom );

  window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();

}
function rotate() {
  scene.children.map((obj) => {
      obj.rotation.z += 0.05;
      obj.rotation.y += 0.01
  })
}
function render() {
  camera.position.x = 60;
  camera.position.y = 0;
  camera.position.z = 0;
  camera.lookAt( scene.position );
  rotate();
  renderer.render( scene, camera );
}
