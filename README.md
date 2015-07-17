# bahaiwritings

Although the [TextBrowser](https://github.com/brettz9/textbrowser) project for which this repository includes content is open sourced under the MIT license (as is the specific JSON formatting (and schema and meta-data files) of this repository), the contents of this data repository are under their own licenses and their copyright is retained. The usage terms of the Baha'i Writings are described at <http://www.bahai.org/legal>.

# Installation

If you wish the TextBrowser dependency, install with:

`
bower install git@bitbucket.org:brettz9/bahaiwritings.git
`

If you just wish the Bahá'í Writings JSON and do not wish the TextBrowser dependency, install with:

`
bower install git@bitbucket.org:brettz9/bahaiwritings.git#notextbrowser
`

The copies should be the same except that the `dependencies` property in the `bower.json` is not set in the latter.


# Todos

1. When textbrowser handles the recent localization changes to files.json (and languages.json, site.json), and table/field-specific to metadata (or schema?) files, delete `pre-locale-changes` branch (and merge `master` into `notextbrowser` branch).
1. ONGOING: Ensure `notextbrowser` branch is kept up to date with `master` besides the `bower.json` difference.
1. Once stabilized, target textbrowser dependency by tagged version.
1. Need to split Collins into own repo? (or describe terms)
1. The base code of browse0.php, browse.php, browse9.php are all XHTML compliant, but there are a good number of invalid XHTML in the JSON databases Qur'an and Bible (links w/o quotes) that would ideally be replaced as well as the XHTML and link locations in the Iqan copy (just to be nice and clean)
1. Upload newer Collins and fix any bugs in formatting.
1. Add Collins language metadata for each field
1. Add/Add back references for automated: Synopsis, Roman numerals (pm, gwb), Chinese numbers, word-by-word translation (Persian/Arabic/German/English), auto-romanized Persian (Baha'i-style with help link to http://bahai9.com/wiki/Pronunciation ), Persian with English tooltips, English with Persian tooltips, text-to-(Google search, Google define, Wikipedia, bahai9.com edit pages); add Word-by-word/phrase mapping
1. Waiting: It is hoped that the addition of these tables (which are Scriptures) can also be automatically generated from any possible future authoritative API
    1. Suggest API to Baha'i World Centre to automatically (and periodically) parse their texts into JSON here to ensure we have the most up-to-date and corrected translations
1. Once implemented, apply `prefer_alias` to Qur'an and Bible
1. Lower priority
    1. Add any other reasonable browse_options (e.g., to Collins esp.)
    1. Add "By page" for the Aqdas (once parsed by page)
    1. If implementing combining of fields, add Collins for this.
    1. Further localization including column aliases, etc.
