// serve.js

const budo = require('budo');
const babelify = require('babelify');

let args = process.argv.slice(2)[0];

if (args === undefined || args === '') {
	args = 'dev';
}

console.log('Args : ', args);


budo(`./${args}/index.js`, {
  live: true,             // setup live reload
  open:true,
  browserify: {
    transform: [["babelify", { "presets": ["es2015"] }]]
  }
}).on('connect', function (ev) {
  console.log('Server running on %s', ev.uri)
  console.log('LiveReload running on port %s', ev.livePort)
}).on('update', function (buffer) {
  console.log('bundle - %d bytes', buffer.length)
})

