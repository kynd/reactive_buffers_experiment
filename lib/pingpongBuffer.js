let glFBO = require("gl-fbo");
let clear = require('gl-clear')({color: [0.5, 0.5, 0.5, 1.0]});
let fillScreen = require("a-big-triangle");

class pingPongBuffer {
  constructor(shell, updateShader, w, h) {
    this.shell = shell;
    this.updateShader = updateShader;
    this.w = w;
    this.h = h;

    let gl = this.shell.gl;
    this.uniforms = {};
    this.pingpongIndex = 0;
    this.fbos = [ glFBO(gl, [w,h], {float: true}), glFBO(gl, [w,h], {float: true}) ];
    this.fbos[0].color[0].minFilter = gl.LINEAR;
    this.fbos[1].color[0].minFilter = gl.LINEAR;
    this.fbos[0].bind();
    clear(gl);
    this.fbos[1].bind();
    clear(gl);
  }

  update() {
    let gl = this.shell.gl;
    let prevFbo = this.fbos[this.pingpongIndex];
    let currentFbo = this.fbos[this.pingpongIndex ^= 1];

    currentFbo.bind();
    this.updateShader.bind();
    this.updateShader.uniforms.buffer = prevFbo.color[0].bind(0);
    this.updateShader.uniforms.frameCount = this.shell.frameCount;
    this.updateShader.uniforms.dims = prevFbo.shape;
    this.setUniforms(this.updateShader, this.uniforms);
    fillScreen(gl);

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.drawingBufferWidth,gl.drawingBufferHeight);
  }

  setUniforms(shader, uniforms) {
    for (let key in uniforms) {
      shader.uniforms[key] = uniforms[key];
    }
  }

  getCurrentFbo() {
    return this.fbos[this.pingpongIndex];
  }
}

module.exports = pingPongBuffer;
