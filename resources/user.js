/*globals TextBrowser, URLSearchParams*/
window.addEventListener('DOMContentLoaded', function () {'use strict';

    var params = new URLSearchParams(location.hash.slice(1));
    document.domain = params.get('domain') || document.domain; // Let this be iframe-embeddable from any domain
    var tb = new TextBrowser({
        // languages: 'bower_components/bahaiwritings/appdata/languages.json', // Default
        // site: 'site.json' // Default
        files: 'files.json'
    });
    tb.init();

});
