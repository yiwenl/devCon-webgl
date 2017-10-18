// index.js
import alfrid, { GL } from 'alfrid';
import dat from 'dat-gui';

const size = Math.min(window.innerHeight, 500);
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);

GL.init(canvas);
GL.setSize(size, size);

