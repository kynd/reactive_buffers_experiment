
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
  vec4 samp = texture2D(buffer, vTexCoord);
  vec4 pSamp = texture2D(buffer, vTexCoord - (samp.rg - 0.5) * 40.0 / dims);

  vec2 d[4];
  d[0] = vec2(-1.0, 0.0);
  d[1] = vec2(0.0, -1.0);
  d[2] = vec2(1.0, 0.0);
  d[3] = vec2(0.0, 1.0);

  vec2 wSum = vec2(0.0);
  for (int i = 0; i < 4; i ++) {
    vec4 wSamp = texture2D(buffer0, vTexCoord + d[i] / dims);
    wSum -= d[i] * wSamp.r;
  }

  vec4 color = vec4(pSamp.rg + wSum * 0.28, 0.0, 1.0);

  vec4 noise = texture2D(buffer3, vTexCoord);
  color = mix(color, noise, 0.02);

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
