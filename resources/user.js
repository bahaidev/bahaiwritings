/*globals TextBrowser*/
window.addEventListener('DOMContentLoaded', function () {'use strict';

    var tb = new TextBrowser({
        // languages: 'bower_components/bahaiwritings/appdata/languages.json', // Default
        files: 'files.json'
    });
    tb.init();

});
