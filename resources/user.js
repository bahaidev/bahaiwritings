import TextBrowser from '../node_modules/textbrowser/resources/index.js';
// This will only work from subdomains; would need postMessage() routine to allow introspection
/*
const params = new URLSearchParams(location.hash.slice(1));
document.domain = params.get('domain') || document.domain; // Let this be iframe-embeddable
*/
// Todo: Reenable the following in `files.json`?
// {"name": "collins", "file": {"$ref": "data/other-works/Collins.json"}, "schemaFile": "Collins.jsonschema", "metadataFile": "Collins.metadata"},

const tb = new TextBrowser({
    // languages: 'node_modules/bahaiwritings/appdata/languages.json', // Default
    // serviceWorkerPath: 'sw.js', // Default
    // site: 'site.json', // Default
    // localizeParamNames: true, // Not well-tested
    // hideFormattingSection: true,
    // requestPersistentStorage: false,
    // showEmptyInterlinear: false,
    // showTitleOnSingleInterlinear: false,
    files: 'files.json',
    namespace: 'bahaiwritings',
    allowPlugins: true,
    trustFormatHTML: true,
    skipIndexedDB: true,
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
tb.init();
