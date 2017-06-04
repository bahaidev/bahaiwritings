# bahaiwritings

*The Bahá'í Writings in JSON format with supporting JSON Schema
and meta-data.*

Although the [TextBrowser](https://github.com/brettz9/textbrowser)
project for which this repository includes content is open sourced under
the MIT license (as is the specific JSON formatting (and schema and
meta-data files) of this repository), the contents of this data
repository are under their own licenses and their copyright is
retained. The usage terms of the Baha'i Writings are described
at <http://www.bahai.org/legal>. The Qur'an and Bible translations
(Rodwell/Sale and the King James) as well as the notes of Sale
and Rodwell are in the public domain. The Baha'i translation
cross-references are under the MIT license. *Lights of Guidance*
is under its own copyright as is the *Collins* bibliography.

## Installation

If you wish the `TextBrowser` dependency, install with:

```shell
bower install git@bitbucket.org:brettz9/bahaiwritings.git
```

If you just wish the Bahá'í Writings JSON and do not wish
the `TextBrowser` dependency, install with:

```shell
bower install git@bitbucket.org:brettz9/bahaiwritings.git#notextbrowser
```

The JSON data files should be the same. Note that in addition to certain
HTML, JavaScript, and CSS-related files being removed in the latter,
the `dependencies` property in its `bower.json` is also not set. The
file `site.json` is also not present as that is oriented for TextBrowser.

Note that the schema files to which the included schema files belong are
at <https://github.com/brettz9/textbrowser/tree/master/general-schemas>.

## To-dos

1.  Waiting: It is hoped that the addition of these tables (which are
    Scriptures) can also be automatically generated from any possible
    future authoritative API

    1.  Suggest API to Baha'i World Centre to automatically (and
        periodically) parse their texts into JSON here to ensure we
        have the most up-to-date and corrected translations

1.  Waiting: Once stabilized, target `TextBrowser` dependency by tagged
    version.

1.  ONGOING:

    1.  Ensure `notextbrowser` branch is kept up to date with `master`
        besides the `bower.json` and absent HTML/JavaScript/CSS differences.

    1.  Ensure still passing tests/validating

1.  See TextBrowser to-dos

1.  Add/change data files and meta-data files to use `$schema`?

1.  Fix TextBrowser so it can load with a port in `npm start`

1.  Address how this project may still be consistent with
    <http://bahai-library.com/uhj_interlinear_writings_cta>

1.  Change schema references (in both `bahaiwritings` branches) to point
    to absolute URLs so as to be independent of repository/branch (rather
    than their current assumption of being utilized within `TextBrowser`).

1.  Add/Add back references for automated:

    1.  Synopsis, Roman numerals (pm, gwb), Chinese numbers, word-by-word
        translation (Persian/Arabic/German/English), auto-romanized Persian
        (Baha'i-style with help link to
        <http://bahai9.com/wiki/Pronunciation>), Persian with English
        tooltips, English with Persian tooltips,
        text-to-(Google search, Google define, Wikipedia, bahai9.com
        edit pages); add Word-by-word/phrase mapping

    1.  Make a version for the [Browser API](https://developer.mozilla.org/en-US/docs/Web/API/Using_the_Browser_API)
        to enable side-by-side views of (Bahai9.com) iframes dedicated to a
        given verse/paragraph!

1.  Specific works

    1.  Qur'an and Bible

        1.  Re-build based on formatted copies so as not to lose visual
            distinguishability, e.g., Sale's many superscripts, etc.

        1.  There is a good amount of invalid XHTML in the JSON databases
              for the Qur'an and Bible (links w/o quotes) that would ideally
              be replaced (Tidy script?) as well as the XHTML and link
              locations in the Iqan copy (would just be nice to be clean
              and polyglot-friendly for any XHTML5 uses)

    1.  Collins

        1.  Fix validation

        1.  Need to split Collins into own repo? (or describe terms)

        1.  Upload newer Collins and fix any bugs in formatting.

        1.  Add Collins language metadata for each field

        1.  Lower priority: If implementing combining of fields, add
            Collins for this.

        1.  Add any other reasonable `browse_options`

1.  Lower priority

    1.  Add any other reasonable `browse_options`
    1.  Add "By page" for the Aqdas (once parsed by page)
    1.  Further localization including column aliases, etc.

## Testing

You will first need to run `npm install`.

The syntax used in the tests currently only works in a modern browser.
Note that this may lock up your browser as the validator loads all of
the files:

```shell
npm test
```

If you merely wish to see the app running in a server, you can run:

```shell
npm start
```

If you do not wish to automatically open a tab each time the command is run,
use:

```shell
npm run start-no-open
```
