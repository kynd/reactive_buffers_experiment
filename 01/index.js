// -----------------------------------------------------------
let bufferExperimentBase = require('../lib/bufferExperimentBase.js');
let pingpongBuffer = require('../lib/pingpongBuffer');
let geometry = require('gl-geometry');
let glShader = require('gl-shader');
let glslify = require('glslify');

// -----------------------------------------------------------

class bufferExperiment extends bufferExperimentBase {
  constructor() {
    super();
    document.addEventListener("click", (evt)=>{
      document.getElementsByTagName("p")[0].className = "opaque";
      window.requestAnimationFrame((time)=>{
        window.requestAnimationFrame((time)=>{
          document.getElementsByTagName("p")[0].className = "fade";
        });
      });
    });
  }

  init() {
    this.setup(1280, 900);
    let gl = this.shell.gl;

    this.addBuffer("wave", glslify('./shaders/wave.frag'));
    this.addBuffer("tint", glslify('./shaders/tint.frag'));
    this.addBuffer("force", glslify('./shaders/force.frag'));
    this.addBuffer("noise", glslify('./shaders/noise.frag'));

    this.setupRenderShader(glslify('./shaders/render.frag'));
  }

  update() {
    this.updateBuffers();
  }

  draw() {
    this.drawBuffers();
  }
}

let experiment = new bufferExperiment();
