var pixels  = require('canvas-pixels')
var context = require('gl-context')
var clear   = require('./')
var test    = require('tape')

test('defaults: color', function(t) {
  t.deepEqual(clear({}).color, [0, 0, 0, 1], 'nothing passed')
  t.deepEqual(clear({ color: false }).color, false, 'false passed')
  t.deepEqual(clear({ color: true }).color, [0, 0, 0, 1], 'true passed')
  t.deepEqual(clear({ color: [1, 1, 0, 1] }).color, [1, 1, 0, 1], 'array passed')

  t.end()
})

test('defaults: depth', function(t) {
  t.deepEqual(clear({}).depth, 1, 'nothing passed')
  t.deepEqual(clear({ depth: false }).depth, false, 'false passed')
  t.deepEqual(clear({ depth: true }).depth, 1, 'true passed')
  t.deepEqual(clear({ depth: 10 }).depth, 10, 'number passed')

  t.end()
})

test('defaults: stencil', function(t) {
  t.deepEqual(clear({}).stencil, false, 'nothing passed')
  t.deepEqual(clear({ stencil: false }).stencil, false, 'false passed')
  t.deepEqual(clear({ stencil: true }).stencil, 1, 'true passed')
  t.deepEqual(clear({ stencil: 10 }).stencil, 10, 'number passed')

  t.end()
})

test('clear: color', function(t) {
  var canvas = document.createElement('canvas')
  var gl = context(canvas)

  canvas.width  = 1
  canvas.height = 1

  clear({ color: [1, 1, 0, 1] })(gl)
  t.deepEqual(pixels(gl), [255, 255, 0, 255], 'set to array')

  clear({ color: false })(gl)
  t.deepEqual(pixels(gl), [255, 255, 0, 255], 'does not clear when false')

  clear({ color: true })(gl)
  t.deepEqual(pixels(gl), [0, 0, 0, 255], 'black when true')

  var c = clear()

  c.color = [1, 1, 0, 1]
  c(gl)
  t.deepEqual(pixels(gl), [255, 255, 0, 255], 'set to array via setter')

  clear({ color: [0, 1, 0, 1] })(gl)
  c.color = false
  c(gl)
  t.deepEqual(pixels(gl), [0, 255, 0, 255], 'can disable via setter')

  c.color = true
  c(gl)
  t.deepEqual(pixels(gl), [0, 0, 0, 255], 'can enable via setter')

  t.end()
})
