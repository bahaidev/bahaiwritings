
var schemaBase = '/bahaiwritings/bower_components/textbrowser/general-schemas/';

var bahaiwritingsTests = {
    'basic test': function (test) {
        test.expect(1);

        Promise.all([
            JsonRefs.resolveRefsAt('files.jsonschema', {relativeBase: schemaBase}),
            JsonRefs.resolveRefsAt('bahaiwritings/files.json', {relativeBase: '../'})
        ]).then(function ([{resolved: schema}, {resolved: data}]) {
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

            test.strictEqual(valid, true);
            test.done();
        });
    }
};

if (typeof exports !== 'undefined') {
    module.exports = bahaiwritingsTests;
}
