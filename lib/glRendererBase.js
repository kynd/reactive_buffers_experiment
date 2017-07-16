// -----------------------------------------------------------
let now = require("gl-now");
let mat3 = require('gl-matrix').mat3;
let mat4 = require('gl-matrix').mat4;
let vec2 = require('gl-matrix').vec2;
let vec3 = require('gl-matrix').vec3;
// -----------------------------------------------------------

class glRendererBase {
  constructor() {
    this.frameCount = 0;
    this.shell = now();
    this.shell.preventDefults = false;
    this.shell.on("gl-init", this.__init.bind(this));
    this.running = true;
  }

  __init() {

    let gl = this.shell.gl;
    this.shell.on("tick", this.tick.bind(this));
    this.shell.on("gl-render", this.__loop.bind(this));
    window.addEventListener( 'keydown', this.keyDown.bind(this), false );
    this.init();
  }

  unbindFbo() {
    let gl = this.shell.gl;
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.drawingBufferWidth,gl.drawingBufferHeight);
  }
  tick() {}
  update() {}
  draw() {}
  keyDown() {}

  __loop() {
    if (!this.running) {return;}
    this.update();
    this.draw();
    this.frameCount ++;
  }
}

module.exports = glRendererBase;
