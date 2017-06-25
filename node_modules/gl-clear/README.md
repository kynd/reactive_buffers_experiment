# gl-clear [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A helper WebGL module for clearing the current buffer – extracted from
[@mikolalysenko](http://github.com/mikolalysenko)'s
[gl-now](http://github.com/mikolalysenko/gl-now).

## Usage

[![NPM](https://nodei.co/npm/gl-clear.png)](https://nodei.co/npm/gl-clear/)

### `clear = glClear(options)`

Creates a clear function for you, accepting the following options:

* `color`: An RGBA array for the colors to clear the buffer to, between 0 and 1.
  Set to `false` to disable.
* `depth`: A single value to clear the depth buffer to. Set to `false` to disable.
* `stencil`: A single value to clear the stencil buffer to, disabled by default.

### `clear(gl)`

Clears the current buffer on the `gl` context.

### `clear.color = color`

Updates the clear color. Set to `false` to disable.

### `clear.depth = depth`

Updates the depth value to clear to. Set to `false` to disable.

### `clear.stencil = stencil`

Updates the stencil value to clear to. Set to `false` to disable.

## Alternatives

This module is intended as a small shorthand to WebGL's clear methods.
Thankfully clearing is a simple procedure so you are also welcome to fall back
onto WebGL's clear methods if `gl-clear` doesn't meet your needs. For example:

``` javascript
// clear the screen red, and clear the depth buffer:
gl.clearColor(1, 0, 0, 1)
gl.clearDepth(1)
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
```

If you've written your own clear module, let us know and we'll link to it
here!

## License

MIT. See [LICENSE.md](http://github.com/hughsk/gl-clear/blob/master/LICENSE.md) for details.
