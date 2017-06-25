var test = require('tape')
var ndarray = require('ndarray')
var isnd = require('./')

function View3dtrick16() {
  this.dtype = 'fake'
}
function View3dint8() {
  /* no .dtype */
}

test('isnd', function(t) {
  t.plan(6)

  t.ok(isnd(ndarray(new Int8Array(32 * 32), [32, 32])))
  t.ok(isnd(ndarray(new Float64Array(32))))
  t.ok(isnd(ndarray(new Uint32Array(4 * 4 * 4), [4, 4, 4])))

  t.ok(!isnd(new Int8Array(32 * 32), [32, 32]))
  t.ok(!isnd(new View3dtrick16()))
  t.ok(!isnd(new View3dint8()))
})
