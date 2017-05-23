/* globals Ajv:true, Promise, module, exports, require */
'use strict';
var JsonRefs, Ajv, getJSON, __dirname, path; // eslint-disable-line no-var

let appBase = '../';
if (typeof exports !== 'undefined') {
    Ajv = require('ajv');
    JsonRefs = require('json-refs');
    getJSON = require('simple-get-json');
    path = require('path');
} else {
    path = {
        join: (...args) => args.join('')
    };
    appBase = location.protocol + '//' + location.host + '/';
    __dirname = ''; // eslint-disable-line no-global-assign
}

const textbrowserBase = appBase + 'node_modules/textbrowser/';
const schemaBase = textbrowserBase + 'general-schemas/';
// const localesBase = textbrowserBase + 'locales/';
// const appdataBase = textbrowserBase + 'appdata/';

/**
* @param {object} schema The schema object
* @param {any} data The instance document to validate
* @returns {boolean} Whether valid or not
*/
function validate (schema, data, extraSchemas = []) {
    const ajv = Ajv(); // eslint-disable-line new-cap
    let valid;
    try {
        extraSchemas.forEach(([key, val]) => {
            ajv.addSchema(val, key);
        });
        valid = ajv.validate(schema, data);
    } catch (e) {
        console.log(e); // eslint-disable-line no-console
    } finally {
        if (!valid) { console.log(JSON.stringify(ajv.errors, null, 2)); } // eslint-disable-line no-console
    }
    return valid;
}

const bahaiwritingsTests = {
    'files.json test': function (test) {
        test.expect(1);
        Promise.all([
            getJSON(path.join(__dirname, appBase, 'files.json')),
            ...[
                'files.jsonschema',
                'array-of-arrays.jsonschema',
                'locale.jsonschema',
                'metadata.jsonschema',
                'table.jsonschema',
                'table-container.jsonschema'
            ].map((f) => getJSON(path.join(__dirname, schemaBase, f)))
        ]).then(function ([data, schema, arrayOfArrays, locale, metadata, table, tableContainer]) {
            const valid = validate(schema, data, [
                ['array-of-arrays.jsonschema', arrayOfArrays],
                ['locale.jsonschema', locale],
                ['metadata.jsonschema', metadata],
                ['table.jsonschema', table],
                ['table-container.jsonschema', tableContainer]
            ]);
            test.strictEqual(valid, true);
            test.done();
        });
    },
    'site.json test': function (test) {
        test.expect(1);
        Promise.all([
            JsonRefs.resolveRefsAt(path.join(__dirname, appBase, 'site.json')),
            getJSON(path.join(__dirname, schemaBase, 'site.jsonschema')),
            getJSON(path.join(__dirname, schemaBase, 'locale.jsonschema'))
        ]).then(function ([data, schema, extraSchema]) {
            const valid = validate(schema, data, [['locale.jsonschema', extraSchema]]);
            test.strictEqual(valid, true);
            test.done();
        });
    }
};

if (typeof exports !== 'undefined') {
    module.exports = bahaiwritingsTests;
}
