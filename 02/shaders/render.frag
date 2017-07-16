precision mediump float;
uniform sampler2D buffer;
uniform sampler2D buffer0;
uniform sampler2D buffer1;
uniform sampler2D buffer2;
uniform sampler2D buffer3;
uniform sampler2D buffer4;
uniform sampler2D texture0;
uniform vec2 dims;
varying vec2 vTexCoord;


vec4 ovl(vec4 a, vec4 b) {
	return vec4(
		(a.r < 0.5) ? 2.0 * a.r * b.r : 1.0 - 2.0 * (1.0 - a.r) * (1.0 - b.r),
		(a.g < 0.5) ? 2.0 * a.g * b.g : 1.0 - 2.0 * (1.0 - a.g) * (1.0 - b.g),
		(a.b < 0.5) ? 2.0 * a.b * b.b : 1.0 - 2.0 * (1.0 - a.b) * (1.0 - b.b),
	max(a.a, b.a));
}

vec4 adj(vec4 color) {
    float r = color.r;
    float g = color.g;
    float b = color.b;

    float rr = 1.0;
    float rg = 0.3;
    float rb = -0.016;
    float ra = -0.002;
    float gr = 0.01;
    float gg = 0.5;
    float gb = 0.2;
    float ga = -0.016;
    float br = 0.04;
    float bg = 0.04;
    float bb = 1.0;
    float ba = -0.003;

    color = vec4(
    r * rr + g * gr + b * br + ra,
    r * rg + g * gg + b * bg + ga,
    r * rb + g * gb + b * bb + ba,
    1.0);
    return color;
}

void main() {
  vec4 wSamp = texture2D(buffer0, vTexCoord);
  vec4 wSamp2 = texture2D(buffer0, vTexCoord + vec2(0.0, 1.0) / dims);
  vec4 tSamp = texture2D(buffer1, vTexCoord + vec2(0.0, wSamp.r - wSamp2.r) / dims * 24.0);

  vec4 color = mix(wSamp * tSamp, ovl(tSamp, wSamp), 0.5);
  color = adj(color);
  gl_FragColor = color;
}
