/*global Ajv, Promise, JsonRefs, module*/
var appBase = '/';
var textbrowserBase = appBase + 'bower_components/textbrowser/';
var schemaBase = textbrowserBase + 'general-schemas/';
// var localesBase = textbrowserBase + 'locales/';
// var appdataBase = textbrowserBase + 'appdata/';

/**
* @param {object} schema The schema object
* @param {any} data The instance document to validate
* @returns {boolean} Whether valid or not
*/
function validate (schema, data) {'use strict';
    var ajv = Ajv(); // eslint-disable-line new-cap
    var valid;
    try {
        valid = ajv.validate(schema, data);
    }
    catch (e) {
        console.log(e); // eslint-disable-line no-console
    }
    finally {
        if (!valid) {console.log(JSON.stringify(ajv.errors));} // eslint-disable-line no-console
    }
    return valid;
}

var bahaiwritingsTests = {
    'files.json test': function (test) {'use strict';
        // test.expect(1);
        Promise.all([
            JsonRefs.resolveRefsAt('files.jsonschema', {relativeBase: schemaBase}),
            JsonRefs.resolveRefsAt('files.json', {relativeBase: appBase})
        ]).then(function ([{resolved: schema}, {resolved: data}]) {
            const valid = validate(schema, data);
            test.strictEqual(valid, true);
            test.done();
        });
    },
    'site.json test': function (test) {'use strict';
        Promise.all([
            JsonRefs.resolveRefsAt('site.jsonschema', {relativeBase: schemaBase}),
            JsonRefs.resolveRefsAt('site.json', {relativeBase: appBase})
        ]).then(function ([{resolved: schema}, {resolved: data}]) {
            const valid = validate(schema, data);
            test.strictEqual(valid, true);
            test.done();
        });
    }
};

if (typeof exports !== 'undefined') {
    module.exports = bahaiwritingsTests;
}
