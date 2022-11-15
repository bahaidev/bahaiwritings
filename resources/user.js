import TextBrowser from '../node_modules/textbrowser/dist/index-es.js';

// Todo: Add a favicon file (and remove empty one in HTML?)
// import loadStylesheets from '../node_modules/load-stylesheets/dist/index-es.js';
// loadStylesheets('favicon.ico'); // No need for `await`

// Todo: Reenable the following in `files.json`?
// {"name": "collins", "file": {"$ref": "data/other-works/Collins.json"}, "schemaFile": "Collins.jsonschema", "metadataFile": "Collins.metadata"},

/*
// This will only work from subdomains; would need postMessage()
//    routine to allow introspection
const params = new URLSearchParams(location.hash.slice(1));
document.domain = params.get('domain') || document.domain; // Let this be iframe-embeddable
*/

const tb = new TextBrowser({
  // languages: 'node_modules/textbrowser/appdata/languages.json', // Default
  // serviceWorkerPath: 'sw.js', // Default
  // site: 'site.json', // Default
  // localizeParamNames: true, // Not well-tested
  // hideFormattingSection: true,
  // requestPersistentStorage: false,
  // showEmptyInterlinear: false,
  // showTitleOnSingleInterlinear: false,
  files: 'files.json',
  stylesheets: [
    '@builtin', 'resources/user.css', 'node_modules/tippy.js/dist/tippy.css'
  ],
  namespace: 'bahaiwritings',
  allowPlugins: true,
  // dynamicBasePath: '',
  trustFormatHTML: true,
  skipIndexedDB: false,
  interlinearSeparator: '<hr />', // Defaults to `<br /><br />`,
  preferencesPlugin: ({
    $, l, jml, paramsSetter, getDataForSerializingParamsAsURL, work,
    replaceHash, getFieldAliasOrNames
  }) => ['div', [
    // Todo: i18nize (ideally with intl-dom)
    (window.chrome
      ? ['div', {id: 'generate-results', hidden: 'true'}, [
        ['div', {class: 'msg-error', hidden: 'true'}, [
          'Failed to copy to clipboard'
        ]],
        ['div', {class: 'msg-success', hidden: 'true'}, [
          'Sucessfully copied to clipboard!'
        ]],
        ['div', {id: 'loading'}, [
          'Loading...'
        ]],
        ['ol', {id: 'steps', hidden: 'true'}, [
          ['li', [
            'Copy the following code (or ',
            ['button', {id: 'copy', $on: {
              async click () {
                const closeMessages = () => {
                  setTimeout(() => {
                    $('.msg-success').hidden = true;
                    $('.msg-error').hidden = true;
                  }, 2000);
                };
                try {
                  await navigator.clipboard.writeText($('#code').value);
                  $('.msg-success').hidden = false;
                } catch (err) {
                  $('.msg-error').hidden = false;
                } finally {
                  closeMessages();
                }
              }
            }}, [
              'click me'
            ]],
            ' to copy automatically):',
            ['textarea', {id: 'code'}]
          ]],
          ['li', [
            'The following steps should be done together (without coming back to this page)',
            ['ol', {type: 'a'}, [
              ['li', [
                'Visit ',
                ['i', [
                  'chrome://settings/searchEngines'
                ]],
                ' (but don\'t copy-paste this URL or you may overwrite the copying just done)'
              ]],
              ['li', [
                'Open the Console (cmd-option-j)'
              ]],
              ['li', [
                'Paste the code copied in the previous step into the console and hit enter'
              ]]
            ]]
          ]]
        ]]
      ]]
      : ['div', {id: 'generate-results', hidden: 'true'}, [
        ['div', {id: 'loading'}, [
          'Loading...'
        ]]
      ]]
    ),
    ['button', {
      title: l('bookmark_generation_tooltip'),
      $on: {
        async click () { // Todo: Give option to edit (keywords and work URLs)
          const getUrlForFieldAliasOrNames = ({
            fieldAliasOrNames, workName
          }) => {
            const paramsCopy = paramsSetter({
              ...getDataForSerializingParamsAsURL(),
              fieldAliasOrNames,
              workName: work, // Delete work of current page
              type: 'shortcutResult'
            });
            return replaceHash(paramsCopy) + `&work=${workName}&${workName}-startEnd1=%s`; // %s will be escaped if set as param; also add changeable workName here
          };

          $('#generate-results').hidden = false;

          const fieldAliasOrNames = await getFieldAliasOrNames();

          if (window.chrome) {
            const urls = fieldAliasOrNames.flatMap(({groupName, worksToFields}) => {
              return worksToFields.map(({fieldAliasOrNames, workName, shortcut: SHORTCUTURL}) => {
                const url = getUrlForFieldAliasOrNames({
                  workName, fieldAliasOrNames
                });
                return {
                  short_name: workName,
                  keyword: SHORTCUTURL,
                  url
                };
              });
            });
            // Keep `var` instead of `let`/`const` so can be re-pasted if needed
            $('#code').value = `  var searchEngines = ${JSON.stringify(urls)};

searchEngines.forEach(({ short_name, keyword, url }) => {
  // Actual search engine import magic
  chrome.send('searchEngineEditStarted', [-1]);
  chrome.send('searchEngineEditCompleted', [short_name, keyword, url]);
});`;
            $('#loading').hidden = true;
            $('#steps').hidden = false;
            return;
          }

          const date = Date.now();
          const ADD_DATE = date;
          const LAST_MODIFIED = date;
          const blob = new Blob([
            new XMLSerializer().serializeToString(
              jml({$document: {
                $DOCTYPE: {name: 'NETSCAPE-Bookmark-file-1'},
                title: l('Bookmarks'),
                body: [
                  ['h1', [l('Bookmarks_Menu')]],
                  ...fieldAliasOrNames.flatMap(({groupName, worksToFields}) => {
                    return [
                      ['dt', [
                        ['h3', {
                          ADD_DATE,
                          LAST_MODIFIED
                        }, [
                          groupName
                        ]]
                      ]],
                      ['dl', [
                        ['p'],
                        ...worksToFields.map(({fieldAliasOrNames, workName, shortcut: SHORTCUTURL}) => {
                          // Todo (low): Add anchor, etc. (until handled by `work-startEnd`); &aqdas-anchor1-1=2&anchorfield1=Paragraph
                          // Todo: option for additional browse field groups (startEnd2, etc.)
                          // Todo: For link text, use `heading` or `alias` from metadata files in place of workName (requires loading all metadata files though)
                          // Todo: Make Chrome NativeExt add-on to manipulate its search engines (to read a bookmarks file from Firefox properly, i.e., including keywords) https://www.makeuseof.com/answers/export-google-chrome-search-engines-address-bar/

                          const url = getUrlForFieldAliasOrNames({
                            workName, fieldAliasOrNames
                          });

                          return ['dt', [
                            ['a', {
                              href: url,
                              ADD_DATE,
                              LAST_MODIFIED,
                              SHORTCUTURL
                            }, [
                              workName
                            ]]
                          ]];
                        })
                      ]]
                    ];
                  })
                ]
              }})
            ).replace(
              // Chrome has a quirk that requires this (and not
              //   just any whitespace)
              // We're not getting the keywords with Chrome,
              //   but at least usable for bookmarks (though
              //   not the groups apparently); update: actually, now we're
              //   not using this in Chrome at all, but keeping in case expose
              /<dt>/gu,
              '\n<dt>'
            )
          ], {type: 'text/html'});
          const url = window.URL.createObjectURL(blob);
          const a = jml('a', {
            hidden: true,
            download: 'bookmarks.html',
            href: url
          }, $('#main'));
          a.click();
          URL.revokeObjectURL(url);
          $('#loading').hidden = true;
        }
      }
    }, [l('Generate_bookmarks')]]
  ]]
});
await tb.init();
// Stylesheets have loaded and init process begun/completing
