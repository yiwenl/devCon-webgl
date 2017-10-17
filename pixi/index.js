// index.js

import * as PIXI from 'pixi.js';

const size = Math.min(window.innerHeight, 500);
const renderer = PIXI.autoDetectRenderer(size, size);
document.body.appendChild(renderer.view);
