/* globals TextBrowser */
window.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // This will only work from subdomains; would need postMessage() routine to allow introspection
    /*
    const params = new URLSearchParams(location.hash.slice(1));
    document.domain = params.get('domain') || document.domain; // Let this be iframe-embeddable
    */
    const tb = new TextBrowser({
        // languages: 'node_modules/bahaiwritings/appdata/languages.json', // Default
        // site: 'site.json' // Default
        files: 'files.json',
        namespace: 'bahaiwritings',
        allowPlugins: true
    });
    tb.init();
});
