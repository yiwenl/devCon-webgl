// copy.frag

#define SHADER_NAME SIMPLE_TEXTURE

precision highp float;

uniform sampler2D texture;

varying vec3 vNormal;
varying float vNoise;

const vec3 LIGHT = vec3(1.0, .8, .6);

float diffuse(vec3 N, vec3 L) {
	return max(dot(N, normalize(L)), 0.0);
}


vec3 diffuse(vec3 N, vec3 L, vec3 C) {
	return diffuse(N, L) * C;
}


void main(void) {
	float d = diffuse(vNormal, LIGHT);
	d = mix(d, 1.0, .5);

	vec2 uv = vec2(vNoise, .5);
	vec3 color = texture2D(texture, uv).rgb;
    gl_FragColor = vec4(vec3(d * color), 1.0);
}