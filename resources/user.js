/*globals TextBrowser */
window.addEventListener('DOMContentLoaded', function () {'use strict';

    // This will only work from subdomains; would need postMessage() routine to allow introspection
    /*
    var params = new URLSearchParams(location.hash.slice(1));
    document.domain = params.get('domain') || document.domain; // Let this be iframe-embeddable
    */
    var tb = new TextBrowser({
        // languages: 'bower_components/bahaiwritings/appdata/languages.json', // Default
        // site: 'site.json' // Default
        files: 'files.json',
        namespace: 'bahaiwritings'
    });
    tb.init();

});
