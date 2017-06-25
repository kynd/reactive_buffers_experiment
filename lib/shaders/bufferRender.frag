precision mediump float;
uniform sampler2D buffer;
varying vec2 vTexCoord;

void main() {
  vec2 coord = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  vec4 samp = texture2D(buffer, coord);
  gl_FragColor = samp;
}
