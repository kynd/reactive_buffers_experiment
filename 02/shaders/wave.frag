precision mediump float;
uniform float frameCount;
uniform sampler2D buffer;
uniform sampler2D buffer0;
uniform sampler2D buffer1;
uniform sampler2D buffer2;
uniform sampler2D buffer3;
uniform sampler2D texture0;
uniform vec2 dims;
varying vec2 vTexCoord;

void main() {
  vec4 color;
  vec4 samp = texture2D(buffer, vTexCoord);
  float va = samp.r;

  vec2 d[4];
  d[0] = vec2(-1.0, -0.0);
  d[1] = vec2(0.0, -1.0);
  d[2] = vec2(1.0, 0.0);
  d[3] = vec2(0.0, 1.0);

  float vb = 0.0;
  float fv = 0.0;
  for (int i = 0; i < 4; i ++) {
    vb += texture2D(buffer, vTexCoord + (d[i]) / dims * 2.0).r;

    vec2 v = texture2D(buffer1, vTexCoord + (d[i]) / dims * 2.0).rg - vec2(0.5);
    fv -= dot(v, d[i]);
  }

  float vc = samp.g;
  samp.b = va * 2.0 + 0.2 * (vb - va * 4.0) - vc + fv * 0.01;
  color = clamp(samp.brga, vec4(0.0), vec4(1.0));

  color = mix(color, vec4(0.5, 0.5, 0.5, 1.0), 0.001);
  gl_FragColor = color;
}
