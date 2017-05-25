/* globals Ajv:true, Promise, module, exports, require */
'use strict';
var JsonRefs, jsonpatch, Ajv, getJSON, __dirname, path; // eslint-disable-line no-var

function cloneJSON (obj) {
    return JSON.parse(JSON.stringify(obj));
}

let appBase = '../';
if (typeof exports !== 'undefined') {
    Ajv = require('ajv');
    JsonRefs = require('json-refs');
    jsonpatch = require('fast-json-patch');
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
function validate (schema, data, extraSchemas = [], additionalOptions = {}) {
    const ajv = new Ajv(Object.assign({}, {extendRefs: 'fail'}, additionalOptions));
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
        test.expect(9);
        Promise.all([
            JsonRefs.resolveRefsAt(path.join(__dirname, appBase, 'files.json')),
            getJSON(path.join(__dirname, appBase + 'node_modules/json-metaschema/draft-06-schema.json')),
            ...[
                'files.jsonschema',
                'array-of-arrays.jsonschema',
                'locale.jsonschema',
                'metadata.jsonschema',
                'table.jsonschema',
                'table-container.jsonschema'
            ].map((f) => getJSON(path.join(__dirname, schemaBase, f)))
        ]).then(function ([
            {resolved: data}, jsonSchema, schema, arrayOfArrays,
            locale, metadata, table, tableContainer
        ]) {
            const extraSchemas = [
                ['array-of-arrays.jsonschema', arrayOfArrays],
                ['locale.jsonschema', locale],
                ['metadata.jsonschema', metadata],
                ['table.jsonschema', table],
                ['table-container.jsonschema', tableContainer]
            ];
            const valid = validate(schema, data, extraSchemas);
            test.strictEqual(valid, true);

            const data2 = cloneJSON(data);
            const valid2 = validate(schema, data2, extraSchemas, {
                removeAdditional: 'all',
                validateSchema: false
            });
            test.strictEqual(valid2, true);
            const diff = jsonpatch.compare(data, data2);
            test.strictEqual(diff.length, 0);

            const schemas = arguments[0].slice(2);
            schemas.forEach((schema, i) => {
                validate(jsonSchema, schema, undefined, {
                    validateSchema: false
                });

                const schema2 = cloneJSON(schema);
                validate(jsonSchema, schema2, extraSchemas, {
                    removeAdditional: 'all',
                    validateSchema: false
                });
                const diff = jsonpatch.compare(schema, schema2);
                test.strictEqual(diff.length, 0);
            });

            test.done();
        });
    },
    'site.json test': function (test) {
        test.expect(9);
        Promise.all([
            JsonRefs.resolveRefsAt(path.join(__dirname, appBase, 'site.json')),
            getJSON(path.join(__dirname, appBase + 'node_modules/json-metaschema/draft-06-schema.json')),
            getJSON(path.join(__dirname, schemaBase, 'site.jsonschema')),
            getJSON(path.join(__dirname, schemaBase, 'locale.jsonschema'))
        ]).then(function ([{resolved: data}, jsonSchema, schema, localeSchema]) {
            const extraSchemas = [['locale.jsonschema', localeSchema]];
            const valid = validate(schema, data, extraSchemas);
            test.strictEqual(valid, true);

            const data2 = cloneJSON(data);
            const valid2 = validate(schema, data2, extraSchemas, {
                removeAdditional: 'all',
                validateSchema: false
            });
            test.strictEqual(valid2, true);
            const diff = jsonpatch.compare(data, data2);
            test.strictEqual(diff.length, 0);

            const schemas = arguments[0].slice(2);
            schemas.forEach((schema, i) => {
                const valid = validate(jsonSchema, schema);
                test.strictEqual(valid, true);

                const schema2 = cloneJSON(schema);
                const valid2 = validate(jsonSchema, schema2, extraSchemas, {
                    removeAdditional: 'all',
                    validateSchema: false
                });
                test.strictEqual(valid2, true);
                const diff = jsonpatch.compare(schema, schema2);
                test.strictEqual(diff.length, 0);
            });

            test.done();
        });
    }
};

if (typeof exports !== 'undefined') {
    module.exports = bahaiwritingsTests;
}
