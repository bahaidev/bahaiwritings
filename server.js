/*eslint-env node */
'use strict';
const ns = require('node-static');
const opn = require('opn');

// const port = 8082; // Todo: Fix so can use this
const portIdx = 3;
const defaultPort = 80;
const port = process.argv[portIdx] || defaultPort;

const file = new ns.Server();

require('http').createServer(function (req, res) {
    req.addListener('end', function () {
        file.serve(req, res);
    }).resume();
}).listen(port);

const siteIdx = 2;
const site = process.argv[siteIdx] || 'http://127.0.0.1/';

if (site === '0') {
    console.log('Started server; open a file within http://127.0.0.1 in the browser. Tests may take a while to load!'); // eslint-disable-line no-console
} else {
    console.log('Started server; opening ' + site + ' in the browser.' + (site.match(/test/) ? ' May take a while to load!' : '')); // eslint-disable-line no-console
    opn(site);
}
