var createOrbitCameraMouseInput = function(pc){

  var OrbitCameraMouseInput = pc.createScript('orbitCameraMouseInput');

  OrbitCameraMouseInput.attributes.add('orbitSensitivity', {
      type: 'number',
      default: 0.3,
      title: 'Orbit Sensitivity',
      description: 'How fast the camera moves around the orbit. Higher is faster'
  });

  OrbitCameraMouseInput.attributes.add('distanceSensitivity', {
      type: 'number',
      default: 0.15,
      title: 'Distance Sensitivity',
      description: 'How fast the camera moves in and out. Higher is faster'
  });

  // initialize code called once per entity
  OrbitCameraMouseInput.prototype.initialize = function() {
      this.orbitCamera = this.entity.script.orbitCamera;

      if (this.orbitCamera) {
          this.on('enable', this.bindEvents);
          this.on('disable', this.unbindEvents);
          this.bindEvents();
      }

      // Disabling the context menu stops the browser displaying a menu when
      // you right-click the page
      this.app.mouse.disableContextMenu();

      this.lookButtonDown = false;
      this.panButtonDown = false;
      this.lastPoint = new pc.Vec2();
  };

  OrbitCameraMouseInput.prototype.bindEvents = function() {
      this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
      this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
      this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
      this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);
      window.addEventListener('mouseout', this.onMouseOut, false);
  };

  OrbitCameraMouseInput.prototype.unbindEvents = function() {
      this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
      this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
      this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
      this.app.mouse.off(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

      window.removeEventListener('mouseout', this.onMouseOut, false);
  };


  OrbitCameraMouseInput.fromWorldPoint = new pc.Vec3();
  OrbitCameraMouseInput.toWorldPoint = new pc.Vec3();
  OrbitCameraMouseInput.worldDiff = new pc.Vec3();


  OrbitCameraMouseInput.prototype.pan = function(screenPoint) {
      var fromWorldPoint = OrbitCameraMouseInput.fromWorldPoint;
      var toWorldPoint = OrbitCameraMouseInput.toWorldPoint;
      var worldDiff = OrbitCameraMouseInput.worldDiff;

      // For panning to work at any zoom level, we use screen point to world projection
      // to work out how far we need to pan the pivotEntity in world space
      var camera = this.entity.camera;
      var distance = this.orbitCamera.distance;

      camera.screenToWorld(screenPoint.x, screenPoint.y, distance, fromWorldPoint);
      camera.screenToWorld(this.lastPoint.x, this.lastPoint.y, distance, toWorldPoint);

      worldDiff.sub2(toWorldPoint, fromWorldPoint);

      this.orbitCamera.pivotPoint.add(worldDiff);
  };


  OrbitCameraMouseInput.prototype.onMouseDown = function (event) {
      event.event.preventDefault();
      event.event.stopPropagation();
      var self = this;
      switch (event.button) {
          case pc.MOUSEBUTTON_LEFT: {
              this.lookButtonDown = true;
          } break;

          case pc.MOUSEBUTTON_MIDDLE:
          case pc.MOUSEBUTTON_RIGHT: {
              this.panButtonDown = true;
          } break;
      }
  };


  OrbitCameraMouseInput.prototype.onMouseUp = function (event) {
      event.event.preventDefault();
      event.event.stopPropagation();
      var self = this;
      switch (event.button) {
          case pc.MOUSEBUTTON_LEFT: {
              this.lookButtonDown = false;
          } break;

          case pc.MOUSEBUTTON_MIDDLE:
          case pc.MOUSEBUTTON_RIGHT: {
              this.panButtonDown = false;
          } break;
      }
  };


  OrbitCameraMouseInput.prototype.onMouseMove = function (event) {
      var mouse = pc.app.mouse;
      if (this.lookButtonDown) {
          this.orbitCamera.pitch -= event.dy * this.orbitSensitivity;
          this.orbitCamera.yaw -= event.dx * this.orbitSensitivity;
      } else if (this.panButtonDown) {
          this.pan(event);
      }

      this.lastPoint.set(event.x, event.y);
  };


  OrbitCameraMouseInput.prototype.onMouseWheel = function (event) {
      this.orbitCamera.distance -= event.wheel * this.distanceSensitivity * (this.orbitCamera.distance * 0.1);
      event.event.preventDefault();
  };


  OrbitCameraMouseInput.prototype.onMouseOut = function (event) {
      this.lookButtonDown = false;
      this.panButtonDown = false;
  };

  return(OrbitCameraMouseInput);

};
