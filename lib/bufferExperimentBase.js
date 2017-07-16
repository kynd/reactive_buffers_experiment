// -----------------------------------------------------------
let geometry = require('gl-geometry');
let fillScreen = require("a-big-triangle");
let pingpongBuffer = require('../lib/pingpongBuffer');
let glRendererBase = require('../lib/glRendererBase.js');
let texture = require("gl-texture2d");
let glShader = require('gl-shader');
let glslify = require('glslify');
let lgp = require('lgp');
// -----------------------------------------------------------

class bufferExperimentBase extends glRendererBase {
  constructor() {
    super();
  }

  setup(w, h) {
    this.w = w;
    this.h = h;
    let gl = this.shell.gl;

    this.previewBuffer = -1;
    this.updateShaders = [];
    this.buffers = [];
    this.uniforms = {};

    this.shell.on("gl-resize", this.onResize.bind(this));
    this.onResize();
  }

  setupRenderShader(frag) {
    let gl = this.shell.gl;

    try {
      this.bufferShader = glShader(gl, glslify('./shaders/fullscreen.vert'), glslify('./shaders/bufferRender.frag'));
      this.renderShader = glShader(gl, glslify('./shaders/fullscreen.vert'), frag);
    } catch(e) {
      console.log(e);
      this.running = false;
      this.shaderError = true;
    }
  }

  addBuffer(id, frag) {
    let gl = this.shell.gl;
    if (!this.updateShaders[id]) {
      try {
        this.updateShaders[id] = glShader(gl, glslify('./shaders/fullscreen.vert'), frag);
      } catch(e) {
        console.log(e);
        this.running = false;
        this.shaderError = true;
      }
    }

    this.buffers.push(new pingpongBuffer(this.shell, this.updateShaders[id], this.w, this.h));
  }

  updateBuffers() {
    this.updateUniforms();
    for (let i = 0; i < this.buffers.length; i ++) {
      this.buffers[i].uniforms = this.uniforms;
      this.uniforms.index = i;
      this.buffers[i].update();
    }
  }

  updateUniforms() {
    this.uniforms.frameCount = this.frameCount;

    this.uniforms.uProjection = this.projection;
    this.uniforms.uView = this.view;
    this.uniforms.uModel = this.model;
    this.uniforms.buffer = this.buffers[0].getCurrentFbo().color[0].bind(0);
    this.uniforms.dims = [this.w, this.h];

    for (let i = 0; i < this.buffers.length; i ++) {
      this.uniforms["buffer" + i] =  this.buffers[i].getCurrentFbo().color[0].bind(i + 1);
    }
  }

  drawBuffers() {
    let gl = this.shell.gl;
    if (this.previewBuffer == -1) {
      this.drawBuffer(this.renderShader);
    } else {
      this.uniforms.buffer = this.buffers[this.previewBuffer].getCurrentFbo().color[0].bind(0);
      this.drawBuffer(this.bufferShader);
    }
    //this.saveVideoFrame();
  }

  drawBuffer(shader) {
    let gl = this.shell.gl;
    shader.bind();
    shader.uniforms = this.uniforms;
    fillScreen(gl);
  }

  saveVideoFrame() {
    if (this.frameCount % 2 == 0) {
      let cnt = ("00000000" + this.frameCount / 2).slice(-8);
      lgp.imageWriter("videoFrame_" + cnt + "." + "png", this.shell.canvas.toDataURL('image/png') );
    }
  }

  keyDown(event) {
    switch (event.keyCode) {
      case 49:
      this.previewBuffer = -1;
      break;
      case 50:
      this.previewBuffer = 0;
      break;
      case 51:
      this.previewBuffer = 1;
      break;
    }
  }

  onResize(event) {
    let canvas = this.shell.gl.canvas;
    let div = canvas.parentNode;
    let scale = Math.min(
      window.innerWidth / this.w,
      window.innerHeight / this.h
    )
    let w = this.w * scale;
    let h = this.h * scale;
    div.style.width = canvas.style.width = w + 'px';
    div.style.height = canvas.style.height = h + 'px';
    div.style.margin = "auto"
  }
}

module.exports = bufferExperimentBase;
