/*eslint-env node */
'use strict';
const open = require('open');
const ns = require('node-static');

// const port = 8082;
const port = 80;

const file = new ns.Server();

require('http').createServer(function (req, res) {
    req.addListener('end', function () {
        file.serve(req, res);
    }).resume();
}).listen(port);

/*eslint-disable no-warning-comments*/

// Todo: Fix main app so it can load with port
console.log('Started server; opening http://127.0.0.1/test/ in the browser. May take a while to load!'); // eslint-disable-line no-console

open('http://127.0.0.1/test/');
