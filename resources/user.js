import TextBrowser from '../node_modules/textbrowser/dist/index-es.js';

/*
// This will only work from subdomains; would need postMessage()
//    routine to allow introspection
const params = new URLSearchParams(location.hash.slice(1));
document.domain = params.get('domain') || document.domain; // Let this be iframe-embeddable
*/

// Todo: Reenable the following in `files.json`?
// {"name": "collins", "file": {"$ref": "data/other-works/Collins.json"}, "schemaFile": "Collins.jsonschema", "metadataFile": "Collins.metadata"},

// Todo: Add a favicon file
// import loadStylesheets from '../node_modules/load-stylesheets/dist/index-es.js';
// loadStylesheets('favicon.ico'); // No need for `await`

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
    stylesheets: ['@builtin', 'resources/user.css'],
    namespace: 'bahaiwritings',
    allowPlugins: true,
    trustFormatHTML: true,
    // skipIndexedDB: true,
    interlinearSeparator: '<hr />', // Defaults to `<br /><br />`
    staticFilesToCache: [
        // Effective defaults
        'index.html',
        'files.json',
        'site.json',
        'resources/user.js',
        'resources/user.css'
    ]
});
await tb.init();
// Stylesheets have loaded and init process begun/completing
})();
