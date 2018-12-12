if ( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var container, stats;
var camera, scene, renderer;
var morph, small, large;
var mixers;
var clock = new THREE.Clock();
var mouse = new THREE.Vector2(), INTERSECTED;
var uniforms;

trying_to_setup = setInterval( attach_if_ready , 1000)

function attach_if_ready() {
  container = $('.three-frame')
  // container will either not exist 
  // OR will already have the three scene set up in it
  if (container[0]){
    init();
    clearInterval(trying_to_setup)
  }
}

function init() {
    clock.start()
    mixers = [];
  
    // Interactive Ref
    // https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.set( 0.0, 300, 400 * 4 );

    scene = new THREE.Scene();

    // Lights

    scene.add( new THREE.AmbientLight( 0x888888 ) );

    var directionalLight = new THREE.DirectionalLight( 0xddeeff, 0.2 );
    directionalLight.position.set( 0.0, 0.5, 0.5 ).normalize();
    scene.add( directionalLight );

    var pointLight1 = new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0x888888 } ) );
    pointLight1.add( new THREE.PointLight( 0x8888dd, 1.0, 300 ) );
    //scene.add( pointLight1 );
    pointLight1.position.x = 0;
    pointLight1.position.y =  250;
    pointLight1.position.z = 350;

    var pointLight2 = new THREE.Mesh( new THREE.SphereBufferGeometry( 1, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0x888888 } ) );
    pointLight2.add( new THREE.PointLight( 0x888888, 1.0, 500 ) );
    //scene.add( pointLight2 );
    pointLight2.position.x = - 100;
    pointLight2.position.y = 220;
    pointLight2.position.z = - 260;

    // BACKGRUND
    var geometry = new THREE.SphereGeometry( 2000, 10, 100 );
    var material = new THREE.MeshBasicMaterial( {color: 0x555555, side: THREE.DoubleSide} );
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    
    $('.three-frame').empty()
    $('.three-frame')[0].appendChild( renderer.domElement );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    //stats = new Stats();
    //container.appendChild( stats.dom );

    var controls = new THREE.OrbitControls( camera, container );

    window.addEventListener( 'resize', onWindowResize, false );

    initMaterial();
}

function initMaterial() {

    var loader = new THREE.TextureLoader();
    var imgTexture = loader.load( 'models/fbx/white.jpg' );
    var thicknessTexture = loader.load( 'models/fbx/white.jpg' );
    imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;

    var shader = new TranslucentShader();
    uniforms = THREE.UniformsUtils.clone( shader.uniforms );

    uniforms[ 'map' ].value = imgTexture;
    uniforms[ 'diffuse' ].value = new THREE.Vector3( .8, 0.8, 0.8 );
    uniforms[ 'shininess' ].value = 500;
    uniforms[ 'thicknessMap' ].value = thicknessTexture;
    uniforms[ 'thicknessColor' ].value = new THREE.Vector3( 0.2, 0.24, 0.3 );
    uniforms[ 'thicknessDistortion' ].value = 0.1;
    uniforms[ 'thicknessAmbient' ].value = 1;
    uniforms[ 'thicknessAttenuation' ].value = 4.3;
    uniforms[ 'thicknessPower' ].value = 10.0;
    uniforms[ 'thicknessScale' ].value = 1.0;

    var material = new THREE.ShaderMaterial( {
        uniforms: uniforms,
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        lights: true
    } );
    material.transparent = true;
    material.extensions.derivatives = true;

    // LOADER
    var loader = new THREE.FBXLoader();
    loader.load( 'models/fbx/babybeige.fbx', function ( object ) {
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
              if ( child.name =='2') {
                small = child
                small.scale.set(1.5,1.5,1.5)
              }
              else if ( child.name =='1') {
                large = child
                large.scale.set(1.5,1.5, 1.5)
              }
            }
        } );

        // Build Morph Mesh
        morph = large.clone()
        morph.geometry = large.geometry.clone()
        morph.material = material
        window.morph = morph
        morph.castShadow = true;
        morph.receiveShadow = true;

        morph.children = []
        scene.add( morph );
        animate()
    } );

    //initGUI( uniforms );
}

function setMorphVertices(morph, meshA, meshB, ratio) {
  // All inputs are buffer meshes
  morph.geometry.attributes.position.needsUpdate = true
  var vertsM = morph.geometry.attributes.position.array
  var vertsA = meshA.geometry.attributes.position.array
  var vertsB = meshB.geometry.attributes.position.array
  var e = .0001
  for ( var i=0; i < vertsM.length ; i++) {
    vertsM[i] = vertsA[i]*(ratio+e) + vertsB[i]*(1-ratio+e)
  }
}

function initGUI( uniforms ) {

    var gui = new dat.GUI();

    var ThicknessControls = function () {

        this.distoration = uniforms[ 'thicknessDistortion' ].value;
        this.ambient = uniforms[ 'thicknessAmbient' ].value;
        this.attenuation = uniforms[ 'thicknessAttenuation' ].value;
        this.power = uniforms[ 'thicknessPower' ].value;
        this.scale = uniforms[ 'thicknessScale' ].value;

    };

    var thicknessControls = new ThicknessControls();
    var thicknessFolder = gui.addFolder( 'Thickness Control' );

    thicknessFolder.add( thicknessControls, 'distoration' ).min( 0.01 ).max( 1 ).step( 0.01 ).onChange( function () {

        uniforms[ 'thicknessDistortion' ].value = thicknessControls.distoration;

    } );

    thicknessFolder.add( thicknessControls, 'ambient' ).min( 0.01 ).max( 5.0 ).step( 0.05 ).onChange( function () {

        uniforms[ 'thicknessAmbient' ].value = thicknessControls.ambient;

    } );

    thicknessFolder.add( thicknessControls, 'attenuation' ).min( 0.01 ).max( 5.0 ).step( 0.05 ).onChange( function () {

        uniforms[ 'thicknessAttenuation' ].value = thicknessControls.attenuation;

    } );

    thicknessFolder.add( thicknessControls, 'power' ).min( 0.01 ).max( 16.0 ).step( 0.1 ).onChange( function () {

        uniforms[ 'thicknessPower' ].value = thicknessControls.power;

    } );

    thicknessFolder.add( thicknessControls, 'scale' ).min( 0.01 ).max( 50.0 ).step( 0.1 ).onChange( function () {

        uniforms[ 'thicknessScale' ].value = thicknessControls.scale;

    } );

    thicknessFolder.open();

}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function animate() {
    
    requestAnimationFrame( animate );
    if (bg_key == 'three') {
      var r = Math.sin( clock.getElapsedTime() )
      morph.lookAt( new THREE.Vector3( mouse.x*window.innerWidth*10, mouse.y*innerHeight*10, -10000))
      //var r = 1
      //setMorphVertices(morph, small, large, r)
      //stats.update();
      render();
    }
}

function render() {


    renderer.render( scene, camera );

}
