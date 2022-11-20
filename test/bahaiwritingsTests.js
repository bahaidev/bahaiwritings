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
    allowMatchingProperties: true, // `localeKey` and `.*`
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
    ),
    ...['metadata.jsonschema', 'locale.jsonschema'].map(
      (f) => JsonRefs.resolveRefsAt(
        path.join(
          __dirname,
          appBase,
          'node_modules/textbrowser-data-schemas/schemas/',
          f
        ), {
          refPreProcessor (obj, pth) {
            if (
              obj.$ref === '#' &&
              // Extra sanity check to ensure we're only changing for the
              //  known self-reference we need to adjust
              JsonRefs.pathToPtr(pth) === '#/patternProperties/.*/anyOf/2'
            ) {
              // We hard-code the absolute path since the `pth` supplied is
              //  relative to the local (locale.jsonschema) document only,
              //  and we want to get rid of this self-reference with JsonRefs
              //  otherwise insists on adding as a file name reference (which
              //  we don't want for ajv)
              obj.$ref = JsonRefs.pathToPtr([
                'properties', 'localization-strings'
              ]);
            }
            return obj;
          }
        }
      )
    )
  ]);

  let cursor = 0;
  const [
    dataFiles, schemaFiles,
    otherDataFiles, otherSchemaFiles,
    [tableSchemaFile],
    [metadataSchemaFile]
  ] = [
    specificFiles, specificFiles,
    otherSpecificFiles, otherSpecificFiles,
    tableFiles,
    [null]
  ].map((files) => {
    // eslint-disable-next-line no-return-assign -- Convenient
    return results.slice(cursor, cursor += files.length);
  });

  const tableSchema = [
    [
      '../../../node_modules/' +
        'textbrowser-data-schemas/schemas/table.jsonschema',
      tableSchemaFile
    ]
  ];

  // console.log('resolved', JSON.stringify(metadataSchemaFile.resolved));

  return {
    dataFiles,
    schemaFiles,
    otherDataFiles,
    otherSchemaFiles,
    testSchemaFiles (desc, dtaFiles, schmaFiles) {
      describe(desc, function () {
        dtaFiles.forEach(({resolved: {data, metadata}}, i) => {
          const schema = schmaFiles[i];
          const schemaName = (
            desc === 'Main files' ? specificFiles : otherSpecificFiles
          )[i];

          it('validates schema ' + schemaName, function () {
            const vald = validate(schema, data, tableSchema);
            assert.strictEqual(vald, true);
          });

          it('validates metadata ' + schemaName, function () {
            const vald = validate(
              metadataSchemaFile.resolved, metadata
            );
            assert.strictEqual(vald, true);
          });

          // This doesn't remove all as hoped as don't have
          //   `additionalProperties: false` set
          // https://github.com/ajv-validator/ajv/issues/2170
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
  schemaFiles, otherSchemaFiles,
  testSchemaFiles
} = await asyncSetup();

describe('bahaiwritings Tests', function () {
  this.timeout(50000);

  testSchemaFiles(
    'Main files', dataFiles, schemaFiles
  );
  testSchemaFiles(
    'Other works', otherDataFiles, otherSchemaFiles
  );
});
