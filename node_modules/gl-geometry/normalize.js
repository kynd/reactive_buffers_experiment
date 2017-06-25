var pack = require('array-pack-2d')
var ista = require('is-typedarray')
var createBuffer = require('gl-buffer')
var isnd = require('isndarray')
var dtype = require('dtype')

module.exports.create = create
module.exports.update = update

function create (gl, attr, size, mode, type) {
  // if we get a gl-buffer
  if (attr.handle instanceof WebGLBuffer) {
    return {
      buffer: attr,
      length: attr.length / size / 4
    }
  }

  var arr = normalize(attr, size, type)
  return {
    buffer: createBuffer(gl, arr.data, mode),
    length: arr.length
  }
}

function update (buffer, attr, size, type, offset) {
  // if we get a gl-buffer
  if (attr.handle instanceof WebGLBuffer) {
    throw new Error('Unhandled update case: WebGLBuffer')
  }

  var arr = normalize(attr, size, type)
  buffer.update(arr.data, offset)
}

function normalize (attr, size, type) {
  // if we get a nested 2D array
  if (Array.isArray(attr) && Array.isArray(attr[0])) {
    return {
      data: pack(attr, type),
      length: attr.length
    }
  }

  // if we get a nested 2D array (with the second array being typed)
  if (Array.isArray(attr) && ista(attr[0])) {
    return {
      data: pack(attr, type),
      length: (attr.length * attr[0].length) / size
    }
  }

  // if we get a 1D array
  if (Array.isArray(attr)) {
    return {
      data: new (dtype(type))(attr),
      length: attr.length / size
    }
  }

  // if we get an ndarray
  if (isnd(attr)) {
    return {
      data: attr,
      length: ndlength(attr.shape) / size
    }
  }

  // if we get a typed array
  if (ista(attr)) {
    if (type && !(attr instanceof dtype(type))) {
      attr = convert(attr, dtype(type))
    }

    return {
      data: attr,
      length: attr.length / size
    }
  }
}

function ndlength (shape) {
  var length = 1
  for (var i = 0; i < shape.length; i++) length *= shape[i]
  return length
}

function convert (a, B) {
  var b = new B(a.length)
  for (var i = 0; i < a.length; i++) b[i] = a[i]
  return b
}
