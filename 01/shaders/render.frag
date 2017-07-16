precision highp float;
uniform sampler2D buffer;
uniform sampler2D buffer0;
uniform sampler2D buffer1;
uniform sampler2D buffer2;
varying vec2 vTexCoord;

vec4 mixColor(vec4 c0, vec4 c1, float r) {
  return max(c0, mix(vec4(0.0), c1, r));
}

void main() {
  vec2 coord = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  vec4 tSamp = texture2D(buffer1, coord);
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
  color = mixColor(color, vec4(0.1, 0.1, 0.2, 1.0), tSamp.r);
  color = mixColor(color, vec4(0.8, 0.0, 0.0, 1.0), tSamp.g);
  color = mixColor(color, vec4(0.9, 0.98, 0.98, 1.0), tSamp.b);
  float v = pow(color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722, 1.5);

  gl_FragColor = vec4(v,v,v,1.0);
  //gl_FragColor = color;
}
