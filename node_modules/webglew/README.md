webglew
=======
**WebGL** **E** xtension **W** rangler.  Manages WebGL extensions so you don't have to.

# Example

```javascript
var canvas = document.createElement("canvas")
var gl = canvas.getContext("webgl")
var ext = require("webglew")(gl)

if(ext.OES_texture_float) {
  console.log("GL context supports floats!")
} else {
  console.log("No floating point textures :'(")
}
```

# Install

```
npm install webglew
```

# API

#### `require("webglew")(gl)`
To use the library, call the module with a WebGL context and it will return a JavaScript object with a list of properties.  For convenience, extensions with a vendor specific prefix are aliased to the root WEBGL_* name.  For example,

    WEBKIT_WEBGL_lose_context
    
Becomes:

    WEBGL_lose_context

# Credits
(c) 2013-2014 Mikola Lysenko. MIT