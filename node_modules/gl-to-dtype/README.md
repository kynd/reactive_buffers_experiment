# gl-to-dtype

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Turns a WebGL constant into a [dtype](https://www.npmjs.com/package/dtype) string.

```js
var asDtype = require('gl-to-dtype')
var dtype = require('dtype')

var glType = gl.FLOAT
var type = asDtype(glType)
var array = new (dtype(type))(16)
```

Converts the following:

```js
gl.FLOAT          -> 'float32'
gl.UNSIGNED_INT   -> 'uint32'
gl.INT            -> 'int32'
gl.UNSIGNED_SHORT -> 'uint16'
gl.SHORT          -> 'int16'
gl.UNSIGNED_BYTE  -> 'uint8'
gl.BYTE           -> 'int8'
gl.UNSIGNED_SHORT_4_4_4_4 -> 'uint16'
gl.UNSIGNED_SHORT_5_5_5_1 -> 'uint16'
gl.UNSIGNED_SHORT_5_6_5 -> 'uint16'
```

## Usage

[![NPM](https://nodei.co/npm/gl-to-dtype.png)](https://www.npmjs.com/package/gl-to-dtype)

#### `require('gl-to-dtype')(glType)`

Takes `glType` constant and returns a string representation aligning with [ndarray](https://www.npmjs.com/package/ndarray), [dtype](https://www.npmjs.com/package/dtype) and other modules.

Returns `null` if the flag isn't recognized as a supported type.

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/gl-to-dtype/blob/master/LICENSE.md) for details.
