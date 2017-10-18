// basic.vert

precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aNormal;
attribute vec3 aPosOffset;
attribute vec3 aExtra;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

uniform float uTime;

varying vec2 vTextureCoord;
varying vec3 vNormal;

vec2 rotate(vec2 v, float a) {
	float s = sin(a);
	float c = cos(a);
	mat2 m = mat2(c, -s, s, c);
	return m * v;
}

const float PI = 3.141592653;


mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
	mat4 m = rotationMatrix(axis, angle);
	return (m * vec4(v, 1.0)).xyz;
}

void main(void) {

	vec2 dir = normalize(aPosOffset.xy);
	dir = rotate(dir, PI * 0.5 + aExtra.z * 0.1);
	

	float d = mod(uTime + aExtra.x, 1.0);

	vec3 axis = normalize(aExtra);
	float angle = aExtra.y * uTime * 10.0 + aExtra.z;

	vec3 position = rotate(aVertexPosition, axis, angle);
	position = position * (1.0 - d) + aPosOffset;
	position.xy += dir * d * ( 1.0 + aExtra.y * 2.0);

    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(position, 1.0);
    vTextureCoord = aTextureCoord;
    vNormal = rotate(aNormal, axis, angle);
}