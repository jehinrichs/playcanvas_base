// Create a PlayCanvas application
var canvas = document.getElementById("application-canvas");
var app = new pc.Application(canvas, {
    mouse: new pc.Mouse(canvas)
});
app.loader._handlers.texture.crossOrigin = true;
app.start();

// Fill the available space at full resolution
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

//// Create box entity
//var cube = new pc.Entity();
//cube.addComponent('model', {
//    type: "box"
//});
//
//// Create directional light entity
//var light = new pc.Entity();
//light.addComponent('light');
//
//// Add to hierarchy
//app.root.addChild(cube);
//
//app.root.addChild(light);
//
//// Set up initial positions and orientations
//
//light.setEulerAngles(45, 0, 0);
//
//// Create a rotation script
//var Rotate = pc.createScript('rotate');
//Rotate.prototype.update = function (dt) {
//    this.entity.rotate(10 * dt, 20 * dt, 30 * dt);
//};
//
//// Add rotation script to cube
//cube.addComponent('script');
//cube.script.create('rotate');

// Create camera entity
var camera = new pc.Entity();
camera.addComponent('camera', {clearColor: new pc.Color(0.1, 0.2, 0.3)});
camera.translate(0, 0, 10);

app.root.addChild(camera);
camera.setPosition(0, 0, 3);

// Resize the canvas when the window is resized
window.addEventListener('resize', function () {
    app.resizeCanvas(canvas.width, canvas.height);
});

var data = {
    name: 'forest',
    cubemap: 'http://7ktuvf.com1.z0.glb.clouddn.com/test/1.dds',
    textures: [
        'http://7ktuvf.com1.z0.glb.clouddn.com/test/2.png',
        'http://7ktuvf.com1.z0.glb.clouddn.com/test/3.png',
        'http://7ktuvf.com1.z0.glb.clouddn.com/test/4.png',
        'http://7ktuvf.com1.z0.glb.clouddn.com/test/5.png',
        'http://7ktuvf.com1.z0.glb.clouddn.com/test/6.png',
        'http://7ktuvf.com1.z0.glb.clouddn.com/test/7.png'
    ]
};

var data = {};
var data = {
    name: 'forest',
    cubemap: '../cubemaps/forest/1.dds',
    textures: [
        '../cubemaps/forest/2.png',
        '../cubemaps/forest/3.png',
        '../cubemaps/forest/4.png',
        '../cubemaps/forest/5.png',
        '../cubemaps/forest/6.png',
        '../cubemaps/forest/7.png'
    ]
};

var textures = data.textures.map(function(v, i) {
    var asset = new pc.Asset(data.name + '-' + i, 'texture', { url: v }); 
    app.assets.add(asset);
    return asset.id;
});

var cubemap = new pc.Asset(
    data.name,
    'cubemap',
    { url: data.cubemap },
    {
        anisotropy: 1,
        magFilter: 1,
        minFilter: 5,
        rgbm: true,
        textures: textures
    }
);


console.log(cubemap);

app.setSkybox(cubemap);

//var cm_data = {
//    name: 'Helipad',
//    cubemap: '../cubemaps/Helipad/9729624/Helipad.dds',
//	textures: [	
//		'../cubemaps/Helipad/9729195/Helipad_posx.png',		
//		'../cubemaps/Helipad/9729198/Helipad_negx.png',
//		'../cubemaps/Helipad/9729194/Helipad_posy.png',
//		'../cubemaps/Helipad/9729197/Helipad_negy.png',
//		'../cubemaps/Helipad/9729193/Helipad_posz.png',
//		'../cubemaps/Helipad/9729196/Helipad_negz.png'
//	]
//};

//var cm_data = {
//    name: 'Helipad',
//    cubemap: '../cubemaps/Helipad/Helipad.dds',
//	textures: [	
//		"../cubemaps/Helipad/Helipad_posx.png",		
//		"../cubemaps/Helipad/Helipad_negx.png",
//		"../cubemaps/Helipad/Helipad_posy.png",
//		"../cubemaps/Helipad/Helipad_negy.png",
//		"../cubemaps/Helipad/Helipad_posz.png",
//		"../cubemaps/Helipad/Helipad_negz.png"
//	]
//};

//var cm_textures = cm_data.textures.map(function(v, i) {
//    var cm_asset = new pc.Asset(cm_data.name + '-' + i, 'texture', { url: v }); 
//    app.assets.add(cm_asset);
//    return cm_asset.id;
//});
//
//var cm_helipad = new pc.Asset(
//    cm_data.name,
//    'cubemap',
//    { url: cm_data.cubemap },
//    {
//        anisotropy: 1,
//        magFilter: 1,
//        minFilter: 5,
//        rgbm: true,
//		prefiltered: "../cubemaps/Helipad/9729624/Helipad.dds",
//        textures: cm_textures
//    }
//);

//console.log(cm_helipad);

//app.setSkybox(cm_helipad);