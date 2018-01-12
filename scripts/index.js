var pcbase = (function () {
  
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

  // Resize the canvas when the window is resized
  window.addEventListener('resize', function () {
      app.resizeCanvas(canvas.width, canvas.height);
  });

  // Create box entity
  var cube = new pc.Entity();
  cube.addComponent('model', {
      type: "box"
  });

  //adjust material
  cube.model.material.useMetalness = true;  //metalness not specular
  cube.model.material.metalness = 1;
  cube.model.material.diffuse = new pc.Color(1,0,0);  //diffuse
  cube.model.material.shininess = 100;  //glossiness
  cube.model.material.update();

  // Create directional light entity
  var light = new pc.Entity();
  light.addComponent('light');

  // Create camera entity
  var camera = new pc.Entity();
  camera.addComponent('camera', {
      clearColor: new pc.Color(0.1, 0.2, 0.3)
  });
  camera.addComponent('script');
  camera.script.create(createOrbitCamera(pc));
  camera.script.create(createOrbitCameraMouseInput(pc));
  camera.translate(0, 0, 10);
  camera.setPosition(0, 0, 3);

  // Add to hierarchy
  app.root.addChild(cube);
  app.root.addChild(light);
  app.root.addChild(camera);

  // Set up initial positions and orientations
  //light.setEulerAngles(45, 0, 0); //forest
  light.setEulerAngles(-111.36, -71.05, -169.3); //helipad

  // Create a rotation script
  var Rotate = pc.createScript('rotate');
  Rotate.prototype.update = function (dt) {
      this.entity.rotate(10 * dt, 20 * dt, 30 * dt);
  };

  // Add rotation script to cube
  cube.addComponent('script');
  cube.script.create('rotate');

  //var data = {
  //    name: 'forest',
  //    cubemap: 'cubemaps/forest/1.dds',
  //    textures: [
  //        cubemaps/forest/2.png',
  //        cubemaps/forest/3.png',
  //        cubemaps/forest/4.png',
  //        cubemaps/forest/5.png',
  //        cubemaps/forest/6.png',
  //        cubemaps/forest/7.png'
  //    ]
  //};

  var data = {
      name: 'helipad',
      cubemap: 'cubemaps/helipad/Helipad.dds',
  	textures: [
  		"cubemaps/helipad/Helipad_posx.png",
  		"cubemaps/helipad/Helipad_negx.png",
  		"cubemaps/helipad/Helipad_posy.png",
  		"cubemaps/helipad/Helipad_negy.png",
  		"cubemaps/helipad/Helipad_posz.png",
  		"cubemaps/helipad/Helipad_negz.png"
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
  		    prefiltered: 'cubemaps/helipad/Helipad.dds',
          textures: textures
      }
  );

  app.setSkybox(cubemap);
  app.scene.ambientLight = new pc.Color().fromString('#333333');
  app.scene.skyboxIntensity = 1
  app.scene.skyboxMip = 3;
  app.scene.toneMapping = pc.TONEMAP_ACES;
  app.scene.gammaCorrection = 1;

  return {}; //public vars
}());
