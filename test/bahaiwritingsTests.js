/* eslint-disable import/unambiguous -- Imports are boostrapped */
/* globals path, appBase, JsonRefs, jsonpatch, Ajv,
    getJSON, __dirname -- Polyglot */

/**
 *
 * @param {external:JSON} obj
 * @returns {external:JSON}
 */
function cloneJSON (obj) {
  return JSON.parse(JSON.stringify(obj));
}

const textbrowserDataSchemas = appBase +
  'node_modules/textbrowser-data-schemas/schemas/';
// const localesBase = textbrowserBase + 'locales/';
// const appdataBase = textbrowserBase + 'appdata/';

/**
* @param {PlainObject} schema The schema object
* @param {PlainObject} data The instance document to validate
* @param {string[][]} extraSchemas
* @param {PlainObject} additionalOptions
* @returns {boolean} Whether valid or not
*/
function validate (schema, data, extraSchemas = [], additionalOptions = {}) {
  const ajv = new Ajv({allowMatchingProperties: true, ...additionalOptions});
  let valid;
  try {
    ajv.addFormat('html', () => true);
    ajv.addFormat('language-code', () => true);
    extraSchemas.forEach(([key, val]) => {
      ajv.addSchema(val, key);
    });
    valid = ajv.validate(schema, data);
  } catch (e) {
    // eslint-disable-next-line no-console -- CLI
    console.log(e);
  } finally {
    if (!valid) {
      // eslint-disable-next-line no-console -- CLI
      console.log(JSON.stringify(ajv.errors, null, 2));
    }
  }
  return valid;
}

describe('bahaiwritings Tests', function () {
  it('Specific data files', async function () {
    this.timeout(50000);
    const specificFiles = [
      'aqdas.json',
      'Bible.json',
      'Epistle to the Son of the Wolf.json',
      'Gems of Divine Mysteries.json',
      'gleanings.json',
      'Hidden Words.json',
      'peace.json',
      'pm.json',
      'quran.json',
      'wwtf.json'
    ];
    const otherSpecificFiles = [
      'lights.json',
      'Collins.json'
    ];
    const tableFiles = [
      'table.jsonschema'
    ];

    // Todo: We could also check that the `table` and `fields`-pointed
    //   metadata exists and is valid
    const results = await Promise.all([
      ...specificFiles.map((f) => {
        return JsonRefs.resolveRefsAt(
          path.join(__dirname, appBase, 'data/writings/' + f)
        );
      }),
      ...specificFiles.map((f) => {
        return getJSON(
          path.join(__dirname, appBase, 'data/writings/schemas/' + f + 'schema')
        );
      }),
      ...otherSpecificFiles.map((f) => {
        return JsonRefs.resolveRefsAt(
          path.join(__dirname, appBase, 'data/other-works/' + f)
        );
      }),
      ...otherSpecificFiles.map((f) => {
        return getJSON(path.join(
          __dirname, appBase, 'data/other-works/schemas/' + f + 'schema'
        ));
      }),
      ...tableFiles.map(
        (f) => getJSON(path.join(__dirname, textbrowserDataSchemas, f))
      )
    ]);

    let cursor = 0;
    const [
      dataFiles, schemaFiles, otherDataFiles, otherSchemaFiles, [table]
    ] = [
      specificFiles, specificFiles, otherSpecificFiles,
      otherSpecificFiles, tableFiles
    ].map((files) => {
      // eslint-disable-next-line no-return-assign -- Convenient
      return results.slice(cursor, cursor += files.length);
    });

    const extraSchemas = [
      [
        '../../../node_modules/' +
          'textbrowser-data-schemas/schemas/table.jsonschema',
        table
      ]
    ];
    const testSchemaFiles = (dtaFiles, schmaFiles) => {
      dtaFiles.forEach(({resolved: {data}}, i) => {
        const schema = schmaFiles[i];
        const vald = validate(schema, data, extraSchemas);
        assert.strictEqual(vald, true);

        const data2 = cloneJSON(data);
        const vald2 = validate(schema, data2, extraSchemas, {
          removeAdditional: 'all',
          validateSchema: false
        });
        assert.strictEqual(vald2, true);
        const diff = jsonpatch.compare(data, data2);
        assert.strictEqual(diff.length, 0);
      });
    };
    testSchemaFiles(dataFiles, schemaFiles);
    testSchemaFiles(otherDataFiles, otherSchemaFiles);
  });
});
