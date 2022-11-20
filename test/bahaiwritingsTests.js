/* eslint-disable import/unambiguous -- Imports are boostrapped */
/* globals path, appBase, JsonRefs, Ajv,
    getJSON, __dirname -- Polyglot */

/**
* @param {PlainObject} schema The schema object
* @param {PlainObject} data The instance document to validate
* @param {string[][]} extraSchemas
* @param {PlainObject} additionalOptions
* @returns {boolean} Whether valid or not
*/
function validate (schema, data, extraSchemas = [], additionalOptions = {}) {
  const ajv = new Ajv({
    // allowMatchingProperties: true,
    ...additionalOptions
  });
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

/**
 * @returns {Promise<void>}
 */
async function asyncSetup () {
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
      (f) => getJSON(path.join(__dirname, appBase,
        'node_modules/textbrowser-data-schemas/schemas/', f))
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

  const tableSchema = [
    [
      '../../../node_modules/' +
        'textbrowser-data-schemas/schemas/table.jsonschema',
      table
    ]
  ];

  return {
    dataFiles,
    schemaFiles,
    otherDataFiles,
    otherSchemaFiles,
    table,
    testSchemaFiles (desc, dtaFiles, schmaFiles) {
      describe(desc, function () {
        dtaFiles.forEach(({resolved: {data}}, i) => {
          const schema = schmaFiles[i];
          const schemaName = (
            desc === 'Main files' ? specificFiles : otherSpecificFiles
          )[i];
          it('validates schema ' + schemaName, function () {
            const vald = validate(schema, data, tableSchema);
            assert.strictEqual(vald, true);
          });

          // This doesn't do what I had hoped: https://github.com/ajv-validator/ajv/issues/2170
          // it('has no extra properties', function () {
          //   const data2 = cloneJSON(data);
          //   const vald2 = validate(schema, data2, tableSchema, {
          //     removeAdditional: 'all',
          //     validateSchema: false
          //   });
          //   assert.strictEqual(vald2, true);
          //   const diff = jsonpatch.compare(data, data2);
          //   assert.strictEqual(diff.length, 0);
          // });
        });
      });
    }
  };
}

const {
  dataFiles, otherDataFiles,
  schemaFiles,
  testSchemaFiles,
  otherSchemaFiles
} = await asyncSetup();

describe('bahaiwritings Tests', function () {
  this.timeout(50000);

  testSchemaFiles('Main files', dataFiles, schemaFiles);
  testSchemaFiles('Other works', otherDataFiles, otherSchemaFiles);
});
