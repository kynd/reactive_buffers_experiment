# isndarray

Returns boolean whether the argument is a [ndarray](https://github.com/mikolalysenko/ndarray).

## example

```js
var isnd = require('isndarray')
var ndarray = require('ndarray')

true === isnd(ndarray(new Int8Array(32 * 32), [32, 32]))
true === isnd(ndarray(new Float64Array(32)))
true === isnd(ndarray(new Uint32Array(4 * 4 * 4), [4, 4, 4]))

false === isnd(new Int8Array(32 * 32), [32, 32])
false === isnd(new View3dtrick16())
false === isnd(new View3dint8())

function View3dtrick16() {
  this.dtype = 'fake'
}
function View3dint8() {
  /* no .dtype */
}
```

## API
`isndarray(arr)` will return boolean whether an ndarray.

## install

With [npm](https://npmjs.org) do:

```
npm install isndarray
```

Use [browserify](http://browserify.org) to `require('isndarray')`.

## release history
* 0.1.0 - initial release

## license
Copyright (c) 2013 Kyle Robinson Young<br/>
Licensed under the MIT license.
