precision mediump float;

uniform float frameCount;
uniform vec2 dims;
uniform sampler2D buffer;
uniform sampler2D buffer0;
uniform sampler2D buffer1;
uniform sampler2D buffer2;
uniform sampler2D buffer3;
uniform sampler2D texture0;

varying vec2 vTexCoord;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define OCTAVES 6
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitud = .5;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitud * noise(st);
        st *= 2.;
        amplitud *= .5;
    }
    return value;
}

void main() {
  vec4 color;
  vec2 coord = vTexCoord * dims / 5002.0 - vec2(0.0, frameCount) * 0.00005;
  float r = clamp(fbm(coord * 64.0), 0.0, 1.0);
  float g = clamp(fbm(coord * 32.0 + vec2(123.4)), 0.0, 1.0);
  float b = clamp(fbm(coord + vec2(1234.5)), 0.0, 1.0);
  color = vec4(r, g, b, 1.0);
  gl_FragColor = color;
}
