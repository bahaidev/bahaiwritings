/*globals TextBrowser*/
window.addEventListener('DOMContentLoaded', function () {'use strict';

    var tb = new TextBrowser({
        // languages: 'appdata/languages.json', // Default
        files: 'bower_components/bahaiwritings/files.json'
    });
    tb.init();

});
