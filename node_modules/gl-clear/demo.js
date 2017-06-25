var canvas = document.createElement('canvas')
var gl = require('gl-context')(canvas, render)

var clear = require('./')({
    color: [1, 0, 1, 1]
  , depth: false
  , stencil: false
})

document.body.appendChild(canvas)

function render() {
  clear(gl)
}
