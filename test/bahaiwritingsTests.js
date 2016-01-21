
var schemaBase = '../bower_components/textbrowser/general-schemas/';

var bahaiwritingsTests = {
    'basic test': function (test) {
        test.expect(1);

        Promise.all([
            JsonRefs.resolveRefsAt(schemaBase + 'files.jsonschema'),
            JsonRefs.resolveRefsAt('../files.json')
        ]).then(function ([schema, data]) {
            var ajv = Ajv();
            var valid;
            try {
                valid = ajv.validate(schema, data);
            }
            catch(e) {
                if (!valid) {console.log(JSON.stringify(ajv.errors));}
            }

            test.strictEqual(valid, true);
            test.done();
        });
    }
};

if (typeof exports !== 'undefined') {
    module.exports = bahaiwritingsTests;
}
