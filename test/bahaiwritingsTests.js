
var schemaBase = '../bower_components/textbrowser/general-schemas/';

var bahaiwritingsTests = {
    'basic test': function (test) {
        test.expect(1);

        getJSON([schemaBase + 'files.jsonschema', '../files.json'], function (schema, data) {
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
