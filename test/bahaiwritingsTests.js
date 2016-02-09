
var appBase = '/bahaiwritings/';
var textbrowserBase = appBase + 'bower_components/textbrowser/';
var schemaBase = textbrowserBase + 'general-schemas/';
var localesBase = textbrowserBase + 'locales/';
var appdataBase = textbrowserBase + 'appdata/';

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
    },
    'locales tests': function (test) {
        test.expect(4);
        Promise.all([
            JsonRefs.resolveRefsAt('locale.jsonschema', {relativeBase: schemaBase}),
            JsonRefs.resolveRefsAt('en-US.json', {relativeBase: localesBase}),
            JsonRefs.resolveRefsAt('ar.json', {relativeBase: localesBase}),
            JsonRefs.resolveRefsAt('fa.json', {relativeBase: localesBase}),
            JsonRefs.resolveRefsAt('ru.json', {relativeBase: localesBase})
        ]).then(function ([{resolved: schema}, {resolved: enUS}, {resolved: ar}, {resolved: fa}, {resolved: ru}]) {
            [enUS, ar, fa, ru].forEach(function (locale) {
                valid = validate(schema, locale);
                test.strictEqual(valid, true);
            });
            test.done();
        });
    },
    'languages.json test': function (test) { // See TextBrowser to-dos on what must be fixed for this to work
        Promise.all([
            JsonRefs.resolveRefsAt('languages.jsonschema', {relativeBase: schemaBase}),
            JsonRefs.resolveRefsAt('languages.json', {relativeBase: localesBase})
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
