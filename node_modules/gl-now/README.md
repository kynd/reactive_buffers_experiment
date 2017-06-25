gl-now
======
Create a WebGL context right now!

This module is an extension of [game-shell](https://github.com/mikolalysenko/game-shell) that creates a WebGL enabled canvas and adds it to the specified container.

## Example

[Try this demo in your browser](http://mikolalysenko.github.io/gl-now/)

```javascript
//Initialize shell
var shell = require("gl-now")()

shell.on("gl-init", function() {
  var gl = shell.gl
  
  //Create fragment shader
  var fs = gl.createShader(gl.FRAGMENT_SHADER)
  gl.shaderSource(fs, [
    "void main() {",
      "gl_FragColor = vec4(1, 0, 0, 1);",
    "}"].join("\n"))
  gl.compileShader(fs)

  //Create vertex shader
  var vs = gl.createShader(gl.VERTEX_SHADER)
  gl.shaderSource(vs, [
    "attribute vec3 position;",
    "void main() {",
      "gl_Position = vec4(position, 1.0);",
    "}"].join("\n"))
  gl.compileShader(vs)

  //Link
  var shader = gl.createProgram()
  gl.attachShader(shader, fs)
  gl.attachShader(shader, vs)
  gl.linkProgram(shader)
  gl.useProgram(shader)
  
  //Create buffer
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, 0, 0,
    0, -1, 0,
    1, 1, 0
  ]), gl.STATIC_DRAW)
  
  //Set up attribute pointer
  var position_attribute = gl.getAttribLocation(shader, "position")
  gl.enableVertexAttribArray(position_attribute)
  gl.vertexAttribPointer(position_attribute, 3, gl.FLOAT, false, 0, 0)
})

shell.on("gl-render", function(t) {
  var gl = shell.gl

  //Draw arrays
  gl.drawArrays(gl.TRIANGLES, 0, 3)
})

shell.on("gl-error", function(e) {
  throw new Error("WebGL not supported :(")
})
```

Result:

<img src="https://raw.github.com/mikolalysenko/gl-now/master/screenshot.png">


## Install

    npm install gl-now
    
# API

### `var shell = require("gl-now")([options])`

Options is an object that takes the same fields as in [game-shell](https://github.com/mikolalysenko/game-shell#var-shell--requiregame-shelloptions) with the following additions:

* `clearFlags` a list of flags to clear on redraw.  (Default `gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT`)
* `clearColor` a length 4 array representing background clear color.  (Defaults to element's background-color or else `[0.2, 0.4, 0.8, 1.0]`
* `clearDepth` value to clear depth buffer to (Defaults to `1.0`)
* `clearStencil` value to clear stencil buffer to (Defaults to `0`)
* `extensions` a list of necessary WebGL extensions to support.  Vendor prefix optional.  You can access these extensions later using [webglew](https://npmjs.org/package/webglew)
* `glOptions` on object containing a set of parameters which are passed to the webgl context directly.

## Events

In addition to all the events inherited from [game-shell](https://github.com/mikolalysenko/game-shell#events), `gl-now` adds the following events:

### `gl-init`
Called once the WebGL context is initialized

### `gl-render([frame_time])`
Called at the start of the WebGL frame.

### `gl-error(reason)`
Called if there was an error initializing webgl

### `gl-resize(width, height)`
Called when the WebGL window is resized


## Properties

Finally `gl-now` adds the following extra properties to `game-shell`:

### `shell.gl`

The WebGL context

### `shell.canvas`

The canvas object

### `shell.width`

The width of the gl context

### `shell.height`

The height of the context

### `shell.scale`

The scale of the context, which defaults to 1. Set it to higher values for
a smaller viewport and faster rendering at the expense of quality.

### `shell.mouse`
A length 2 vector giving the current coordinate of the mouse on the screen

### `shell.prevMouse`
A length 2 vector giving the previous coordinate of the mouse on the screen

# Credits
(c) 2013 Mikola Lysenko. MIT License
