var createCamera = require('canvas-orbit-camera')
var mat4 = require('gl-matrix').mat4
var pack = require('array-pack-2d')
var unindex = require('unindex-mesh')
var faceNormals = require('face-normals')
var createContext = require('gl-context')
var ndarray = require('ndarray')
var normals = require('normals')
var glslify = require('glslify')
var bunny = require('bunny')
var createShader = require('gl-shader')
var parseOBJ = require('parse-wavefront-obj')
var fs = require('fs')

var createGeom = require('../')
var clear = require('gl-clear')({
  color: [0xF0 / 255, 0xF1 / 255, 0xF2 / 255, 1],
  depth: true,
  stencil: false
})

// handles simplicial complexes with cells/positions properties
var scPos = bunny
var scNor = normals.vertexNormals(bunny.cells, bunny.positions)
createExample(scPos, scNor).title = 'Simplicial Complex'

// handles Float32Arrays
var uiPos = unindex(bunny.positions, bunny.cells)
var uiNor = faceNormals(uiPos)
createExample(uiPos, uiNor).title = 'Unindexed Mesh, Float32Arrays'

// handles (flat) ndarrays
var ndPos = ndarray(uiPos, [uiPos.length])
var ndNor = ndarray(uiNor, [uiNor.length])
createExample(ndPos, ndNor).title = 'Flat ndarrays'

// also supports .faces() method
createExample(scPos.positions, scNor, scPos.cells).title = '.faces(), Last Call'

// also supports .faces() method with packed data
createExample(pack(scPos.positions), scNor, pack(scPos.cells)).title = '.faces(), Packed Data'

// .faces(), order-independant
createExample(scPos.positions, scNor, scPos.cells, {facesFirst: true}).title = '.faces(), First Call'

createAttributeUpdateExample().title = 'Attribute Update'

function createExample (pos, norm, cells, options) {
  options = options || { }

  var canvas = document.body.appendChild(document.createElement('canvas'))
  var gl = createContext(canvas, render)
  var camera = createCamera(canvas)
  if (options.zoom) camera.distance /= options.zoom
  var projection = mat4.create()
  var shader = createShader(gl,
    glslify('./test.vert'),
    glslify('./test.frag')
  )

  canvas.width = 300
  canvas.height = 300
  canvas.style.margin = '1em'

  var geom = createGeom(gl)
  if (cells && options.facesFirst) geom.faces(cells)

  geom
    .attr('position', pos)
    .attr('normal', norm)

  if (cells && !options.facesFirst) geom.faces(cells)

  function render () {
    if (options.update) {
      options.update(geom)
    }

    var width = canvas.width
    var height = canvas.height

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)
    if (!options.noculling) gl.enable(gl.CULL_FACE)
    gl.enable(gl.DEPTH_TEST)
    gl.viewport(0, 0, width, height)
    clear(gl)

    geom.bind(shader)
    shader.attributes.position.location = 0
    shader.uniforms.uView = camera.view()
    shader.uniforms.uProjection = mat4.perspective(projection
      , Math.PI / 4
      , width / height
      , 0.001
      , 10000
    )

    geom.draw()
    geom.unbind()

    camera.tick()
  }

  return canvas
}

function createAttributeUpdateExample () {
  var anim = parsePC2(fs.readFileSync(__dirname + '/basicCloth.pc2'))
  var obj = parseOBJ(fs.readFileSync(__dirname + '/basicCloth.obj'))
  var norms = normals.vertexNormals(obj.cells, obj.positions)

  var startDate = Date.now()
  var currentFrame = 0

  function update (geom) {
    // Pick appropriate frame (24fps)
    var delta_ms = Date.now() - startDate
    var newFrame = Math.floor(24 * delta_ms / 1000) % anim.frames.length

    // Update geometry on frame change
    if (newFrame !== currentFrame) {
      currentFrame = newFrame
      var framePosition = anim.frames[currentFrame]
      geom.attr('position', framePosition)
      geom.attr('normal', normals.vertexNormals(obj.cells, framePosition))
    }
  }

  return createExample(obj, norms, null, {noculling: true, update: update, zoom: 4})
}

// Basic parser implemented using informations from
// http://mattebb.com/projects/bpython/pointcache/export_pc2.py
function parsePC2 (buf) {
  var pc2 = {}

  // Read header
  pc2.numPoints = buf.readUInt32LE(16)  // Number of points per sample
  pc2.startFrame = buf.readFloatLE(20)  // First sampled frame
  pc2.sampleRate = buf.readFloatLE(24)  // How frequently to sample (or skip) the frames
  pc2.numSamples = buf.readUInt32LE(28) // How many samples are stored in this file

  // Read data
  var off = 32
  pc2.frames = []
  for (var f = pc2.startFrame; f < pc2.startFrame + pc2.numSamples; f += pc2.sampleRate) {
    var frame = []
    for (var i = 0; i < pc2.numPoints; i++) {
      var point = []
      for (var j = 0; j < 3; j++) {
        point.push(buf.readFloatLE(off))
        off += 4
      }
      frame.push(point)
    }
    pc2.frames.push(frame)
  }

  return pc2
}
