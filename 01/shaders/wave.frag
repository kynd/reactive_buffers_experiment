
precision highp float;
uniform float frameCount;
uniform sampler2D buffer;
uniform sampler2D buffer0;
uniform sampler2D buffer1;
uniform sampler2D buffer2;
uniform vec2 dims;
varying vec2 vTexCoord;

void main() {

  vec4 color;
  vec4 samp = texture2D(buffer, vTexCoord);
  vec4 tSamp = texture2D(buffer1, vTexCoord);
  float t = frameCount * 0.001;
  float va = samp.r + sin(tSamp.r + t) * 0.01 - sin(tSamp.b + t) * 0.01;

  vec2 d[4];
  d[0] = vec2(-1.0, -0.0);
  d[1] = vec2(0.0, -1.0);
  d[2] = vec2(1.0, 0.0);
  d[3] = vec2(-0.0, 1.0);

  float vb = 0.0;
  for (int i = 0; i < 4; i ++) {
    vb += texture2D(buffer, vTexCoord + (d[i]) / dims * 2.0).r;
  }

  float vc = samp.g;
  samp.b = va * 2.0 + 0.1 * (vb - va * 4.0) - vc;
  color = clamp(samp.brga, vec4(0.0), vec4(1.0));

  gl_FragColor = color;
}
