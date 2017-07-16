
precision mediump float;
uniform float frameCount;
uniform int index;
uniform sampler2D buffer;
uniform sampler2D buffer0;
uniform sampler2D buffer1;
uniform sampler2D buffer2;
uniform sampler2D buffer3;
uniform vec2 dims;
varying vec2 vTexCoord;

vec4 init() {
  return texture2D(buffer3, vTexCoord);
}


vec4 update() {
  vec4 fSamp = texture2D(buffer2, vTexCoord);
  vec2 force = (fSamp.rg - 0.5) * 1.0;
  vec4 samp = texture2D(buffer, vTexCoord - force / dims * 24.0);

  vec2 d[4];
  d[0] = vec2(-1.0, 0.0);
  d[1] = vec2(0.0, -1.0);
  d[2] = vec2(1.0, 0.0);
  d[3] = vec2(0.0, 1.0);

  vec4 flSum = vec4(0.0);
  for (int i = 0; i < 4; i ++) {
    vec4 flSamp = texture2D(buffer, vTexCoord + d[i] / dims);
    flSum += samp - flSamp;
  }
  flSum /= 4.0;

  vec4 color = samp;
  color.rgb += flSum.rgb * 0.11;
  color = clamp(color, vec4(0.0), vec4(1.0));
  return color;
}

void main() {
  vec4 color;
  if (frameCount <= 1.0) {
    color = init();
  } else {
    color = update();
  }
  gl_FragColor = color;
}
