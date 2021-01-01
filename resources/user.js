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

(async () => {
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
  interlinearSeparator: '<hr />' // Defaults to `<br /><br />`
});
await tb.init();
// Stylesheets have loaded and init process begun/completing
})();
