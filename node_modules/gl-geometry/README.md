# gl-geometry [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A flexible wrapper for [gl-vao](http://github.com/stackgl/gl-vao)
and [gl-buffer](http://github.com/stackgl/gl-buffer) that you can use to
set up renderable WebGL geometries from a variety of different formats.

## Usage ##

[![NPM](https://nodei.co/npm/gl-geometry.png)](https://nodei.co/npm/gl-geometry/)

### geom = createGeometry(gl) ###

Creates a new geometry attached to the WebGL canvas context `gl`.

### geom.attr(name, values[, opt]) ###

Define or update an attribute value, for example using a simplicial complex:

``` javascript
var createGeometry = require('gl-geometry')
var bunny = require('bunny')

var geom = createGeometry(gl)
  .attr('positions', bunny)
```

The following vertex formats are supported and will be normalized:

* Arrays of arrays, e.g. `[[0, 0, 0], [1, 0, 0], [1, 1, 0]]`.

* Flat arrays, e.g. `[0, 0, 0, 1, 0, 0, 1, 1, 0]`.

* [Typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays),
  preferably a `Float32Array`.

* 1-dimensional [ndarrays](https://github.com/scijs/ndarray).

* [simplicial complexes](https://github.com/mikolalysenko/simplicial-complex),
  i.e. an object with a `positions` array and a `cells` array. The former is
  a list of unique vertices in the mesh (if you've used three.js, think
  `THREE.Vector3`), and the latter is an index mapping these vertices to faces
  (`THREE.Face3`) in the mesh. It looks something like this:

  ``` json
  {
    "positions": [
      [0.0, 0.0, 0.0],
      [1.5, 0.0, 0.0],
      [1.5, 1.5, 0.0],
      [0.0, 1.5, 0.0]
    ],
    "cells": [
      [0, 1, 2],
      [1, 2, 3]
    ]
  }
  ```

You can specify `opt.size` for the vertex size, defaults to 3.

You can update attribute values by calling `attr` again with the same `name`:

* By default the entire contents of the associated `gl-buffer` are replaced by
`data`; the buffer will be resized accordingly.

* Alternatively, you can pass `opt.offset` to copy `data` into the current
buffer at a specific offset (in bytes). In this case, the buffer cannot be
resized.

### geom.faces(values[, opt]) ###

Pass a simplicial complex's `cells` property here in any of the above formats
to use it as your index when drawing the geometry. For example:

``` javascript
var createGeometry = require('gl-geometry')
var bunny = require('bunny')

bunny.normals = normals.vertexNormals(
    bunny.cells
  , bunny.positions
)

var geom = createGeometry(gl)
  .attr('positions', bunny.positions)
  .attr('normals', bunny.normals)
  .faces(bunny.cells)
```

You can specify `opt.size` for the cell size, defaults to 3.

### geom.bind([shader]) ###

Binds the underlying [VAO](https://github.com/stackgl/gl-vao) – this must
be called before calling `geom.draw`. Optionally, you can pass in a
[gl-shader](http://github.com/stackgl/gl-shader) to
automatically set up your attribute locations for you.

### geom.draw(mode, start, stop) ###

Draws the geometry to the screen using the currently bound shader.

Optionally, you can pass in the drawing mode, which should be one of the
following:

* `gl.POINTS`
* `gl.LINES`
* `gl.LINE_STRIP`
* `gl.LINE_LOOP`
* `gl.TRIANGLES`
* `gl.TRIANGLE_STRIP`
* `gl.TRIANGLE_FAN`

The default value is `gl.TRIANGLES`. You're also able to pass in a `start` and
`stop` range for the points you want to render, just the same as you would
with `gl.drawArrays` or `gl.drawElements`.

### geom.unbind() ###

Unbinds the underlying VAO. This *must* be done when you're finished drawing,
unless you're binding to another gl-geometry or gl-vao instance.

### geom.dispose() ###

Disposes the underlying element and array buffers, as well as the VAO.

## See Also

* [ArrayBuffer and Typed Arrays](https://www.khronos.org/registry/webgl/specs/1.0/#5.13)
* [The WebGL Context](https://www.khronos.org/registry/webgl/specs/1.0/#5.14)
* [simplicial-complex](http://github.com/mikolalysenko/simplicial-complex)
* [ndarray](https://github.com/scijs/ndarray)
* [gl-shader](https://github.com/stackgl/gl-shader)
* [gl-buffer](https://github.com/stackgl/gl-buffer)
* [gl-vao](https://github.com/stackgl/gl-vao)

## License

MIT. See [LICENSE.md](http://github.com/hughsk/is-typedarray/blob/master/LICENSE.md) for details.
