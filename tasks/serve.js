// serve.js

const budo = require('budo')
const babelify = require('babelify')

budo('./pixi/index.js', {
  live: true,             // setup live reload
  browserify: {
    transform: [["babelify", { "presets": ["es2015"] }]]
  }
}).on('connect', function (ev) {
  console.log('Server running on %s', ev.uri)
  console.log('LiveReload running on port %s', ev.livePort)
}).on('update', function (buffer) {
  console.log('bundle - %d bytes', buffer.length)
})