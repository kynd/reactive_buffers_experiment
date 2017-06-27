
precision highp float;
uniform float frameCount;
uniform int index;
uniform sampler2D buffer;
uniform sampler2D buffer0;
uniform sampler2D buffer1;
uniform sampler2D buffer2;
uniform vec2 dims;
varying vec2 vTexCoord;

vec4 init() {
  vec4 color = vec4(0.0, 0.0, 0.0, 1.0);
  if (vTexCoord.y < 0.01) {
    color.r = 1.0;
  } else if (vTexCoord.y < 0.02) {
    color.g = 1.0;
  } else if (vTexCoord.y < 0.03) {
    color.b = 1.0;
  }
  return color;
}


vec4 update() {
  vec4 color;
  vec2 d[4];
  d[0] = vec2(-1.0, -0.0);
  d[1] = vec2(0.0, -1.0);
  d[2] = vec2(1.0, 0.0);
  d[3] = vec2(-0.0, 1.0);
  vec4 fSamp = texture2D(buffer2, vTexCoord);
  vec2 force = (fSamp.rg - 0.5) * 8.0;
  vec4 samp = texture2D(buffer, vTexCoord + force / dims);
  vec4 wSamp = texture2D(buffer0, vTexCoord + force / dims);

  vec4 dSamp[4];
  vec4 wdSamp[4];
  for (int i = 0; i < 4; i ++) {
    dSamp[i] = texture2D(buffer, vTexCoord + (d[i] + force) / dims);
    wdSamp[i] = texture2D(buffer0, vTexCoord + (d[i] + force) / dims);
  }

  color = samp;
  for (int i = 0; i < 3; i ++) {
    float v = samp[i] * (wSamp.r - 0.5);
    float vd = 0.0;
    for (int j = 0; j < 4; j ++) {
      float vt = dSamp[j][i] * (wdSamp[j].r - 0.5);
      vd += (v - vt) * 0.5;
    }
    color[i] += vd;
  }

  color = clamp(color, vec4(0.0), vec4(1.0));
  if (distance(color, vec4(1.0)) < 0.9) {
    color = vec4(0.0, 0.0, 0.0, 1.0);
  }

  return color;
}

void main() {
  vec4 color;
  if (frameCount == 0.0) {
    color = init();
  } else {
    color = update();
  }
  gl_FragColor = color;
}
