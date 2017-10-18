// index.js

import _regl from 'regl';

const size = Math.min(window.innerHeight, 500);
const canvas = document.createElement("canvas");
canvas.width = canvas.height = size;
document.body.appendChild(canvas);
const regl = _regl(canvas);



