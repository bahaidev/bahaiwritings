
var appBase = '/bahaiwritings/';
var schemaBase = appBase + 'bower_components/textbrowser/general-schemas/';

function validate (schema, data) {
    var ajv = Ajv();
    var valid;
    try {
        valid = ajv.validate(schema, data);
    }
    catch (e) {
        console.log(e);
    }
    finally {
        if (!valid) {console.log(JSON.stringify(ajv.errors));}
    }
    return valid;
}

var bahaiwritingsTests = {
    'files.json test': function (test) {
        // test.expect(1);
        Promise.all([
            JsonRefs.resolveRefsAt('files.jsonschema', {relativeBase: schemaBase}),
            JsonRefs.resolveRefsAt('files.json', {relativeBase: appBase})
        ]).then(function ([{resolved: schema}, {resolved: data}]) {
            valid = validate(schema, data);
            test.strictEqual(valid, true);
            test.done();
        });
    },
    'site.json test': function (test) {
        Promise.all([
            JsonRefs.resolveRefsAt('site.jsonschema', {relativeBase: schemaBase}),
            JsonRefs.resolveRefsAt('site.json', {relativeBase: appBase})
        ]).then(function ([{resolved: schema}, {resolved: data}]) {
            valid = validate(schema, data);
            test.strictEqual(valid, true);
            test.done();
        });
    }
};

if (typeof exports !== 'undefined') {
    module.exports = bahaiwritingsTests;
}
