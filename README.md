# bahaiwritings

Although the [TextBrowser](https://github.com/brettz9/textbrowser) project for which this repository includes content is open sourced under the MIT license (as is the specific JSON formatting (and schema and meta-data files) of this repository), the contents of this data repository are under their own licenses and their copyright is retained. The usage terms of the Baha'i Writings are described at <http://www.bahai.org/legal>.

# Installation

From TextBrowser:

`
bower install git@bitbucket.org:brettz9/bahaiwritings.git
`

# Usage

1. Add to `textbrowser/index.html` based on `textbrowser/index-sample.html`
1. Add to `textbrowser/resources/user.js` based on `textbrowser/resources/user-sample.js` and modify the TextBrowser invocation portion as follows:

```js
var tb = new TextBrowser({
    // languages: 'appdata/languages.json', // Default
    files: 'bower_components/bahaiwritings/files.json'
});
```

# Todos

1. Once stabilized, target textbrowser dependency by tagged version.
1. Bring over locale data from textbrowser into own metadata (or schema?) files
1. Need to split Collins into own repo? (or describe terms)
1. The base code of browse0.php, browse.php, browse9.php are all XHTML compliant, but there are a good number of invalid XHTML in the JSON databases Qur'an and Bible (links w/o quotes) that would ideally be replaced as well as the XHTML and link locations in the Iqan copy (just to be nice and clean)
1. Upload newer Collins and fix any bugs in formatting.
1. Add Collins language metadata for each field
1. Add/Add back references for automated: Synopsis, Roman numerals (pm, gwb), Chinese numbers, word-by-word translation (Persian/Arabic/German/English), auto-romanized Persian (Baha'i-style with help link to http://bahai9.com/wiki/Pronunciation ), Persian with English tooltips, English with Persian tooltips, text-to-(Google search, Google define, Wikipedia, bahai9.com edit pages); add Word-by-word/phrase mapping
1. Move "about" text in textbrowser locales to `files.json`
1. Waiting: It is hoped that the addition of these tables (which are Scriptures) can also be automatically generated from any possible future authoritative API
    1. Suggest API to Baha'i World Centre to automatically (and periodically) parse their texts into JSON here to ensure we have the most up-to-date and corrected translations
1. Once implemented, apply `prefer_alias` to Qur'an and Bible
1. Lower priority
    1. Add any other reasonable browse_options (e.g., to Collins esp.)
    1. Add "By page" for the Aqdas (once parsed by page)
    1. If implementing combining of fields, add Collins for this.
    1. Further localization including column aliases, etc.
