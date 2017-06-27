
precision highp float;
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
  vec4 color = vec4(0.5, 0.5, 0.5, 1.0);
  return color;
}

vec4 update() {
  vec4 color;
  vec2 d[4];
  vec4 nSamp = texture2D(buffer3, vTexCoord);
  vec2 dist = (nSamp.rg - 0.5);
  d[0] = vec2(-1.0, 0.0);
  d[1] = vec2(0.0, -1.0);
  d[2] = vec2(1.0, 0.1);
  d[3] = vec2(-0.0, 1.0);

  float xd = 0.0;
  float yd = 0.0;
  for (int i = 0; i < 4; i ++) {
    vec4 wSamp = texture2D(buffer0, vTexCoord + d[i] / dims);
    xd += wSamp.r * d[i].x;
    yd += wSamp.r * d[i].y;
  }

  color = vec4(0.5 + xd * 2.25 + dist.r, 0.5 + yd * 2.25 + dist.g, 0.5, 1.0);
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
