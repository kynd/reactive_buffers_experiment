attribute vec2 position;
varying vec2 vTexCoord;

void main() {
  gl_Position = vec4(position,0.0,1.0);
  vTexCoord = 0.5 * (position+1.0);
}
