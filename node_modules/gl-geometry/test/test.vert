precision mediump float;

attribute vec3 position;
attribute vec3 normal;
varying vec3 vnormal;
uniform mat4 uProjection;
uniform mat4 uView;

void main() {
  vnormal = (uView * vec4(normal, 1.0)).xyz / 2.0 + 0.5;

  gl_Position = (
      uProjection
    * uView
    * vec4(position, 1.0)
  );
}
