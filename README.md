# bahaiwritings

*The Bahá'í Writings in JSON format with supporting JSON Schema
and meta-data.*

**Note that this repository used to host the web app now
at [bahai-browser](https://github.com/bahaidev/bahai-browser); this
repository has been reserved for the Bahá'í Writings and texts only.**

See the [web app in action](https://bahai-browser.org/), see some videos
[introducing the app](https://bahai-library.com/zamir_textbrowser_bahaiwritings_browser),
or see the [repository for the web app](https://github.com/bahaidev/bahai-browser).

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

```shell
npm install bahaiwritings
```

Note that the schema files to which the included schema files belong are
at <https://github.com/bahaidev/textbrowser-data-schemas/tree/main/schemas>.

## To-dos

1.  Specific works

    1.  Hidden Words
        1. Wiki links to Bahai9.com

    1.  Aqdas
        1.  Passages translated/excerpted by Shoghi Effendi

        1.  For index, add links to other entries, serving as cross-reference

    1.  Qur'an and Bible

        1.  Re-build based on formatted copies so as not to lose visual
            distinguishability, e.g., Sale's many superscripts, etc.

        1.  Parse an Arabic Qur'án into Rodwell's verses and all of the
            Rodwell/Sale and Bahá'í references into traditional versing

        1.  There is a good amount of invalid XHTML in the JSON databases
              for the Qur'an and Bible (links w/o quotes) that would ideally
              be replaced (Tidy script?) as well as the XHTML and link
              locations in the Iqan copy (would just be nice to be clean
              and polyglot-friendly for any XHTML5 uses)

        1.  Integrate from
            <https://bahai-library.com/lippitt_bible_bahai_index>.

    1.  Collins

        1.  Need to split Collins into own repo? (or describe terms)

        1.  Upload newer Collins and fix any bugs in formatting.

        1.  Add Collins language metadata for each field

        1.  Lower priority: If implementing combining of fields, add
            Collins for this.

        1.  Add any other reasonable `browse_options`

    1.  Other works

        1.  Encode more Writings into *TextBrowser* JSON

## Testing

You will first need to run `npm install`.

The syntax used in the tests currently only works in a modern browser.
Note that this may lock up your terminal as the validator must load and
process all of the files (including child files):

```shell
npm test
```

You can also run the browser tests via `npm start`
(from <http://127.0.0.1:8082/test/>). Note, however, that
this may lock up the browser as there are many files to load.

## Background

For background of this project, see *TextBrowser*'s History section.

## Justification

While there was a letter from the international governing body of the
Bahá'í Faith (online at
<http://bahai-library.com/uhj_interlinear_writings_cta>), suggesting
that interlinear publications are not necessary for the Bahá'í Writings,
I do not think that this guidance pertains to our project for the following
reasons:

- The context appears to be more about official print publications which
would need to justify resources being spent on such specialized text versions.
The original question refers to Publishing Trusts and the response speaks of
"all other readers" (besides those comparing with the Persian/Arabic originals)
being distracted, whereas online, there are minimal (and non-official)
resources being spent to provide the works, so there is no concern for
distraction of other readers (and those using our *TextBrowser*-based tool
can indeed selectively disable any column they wish).

- Besides allowing those already familiar with English (or other translations)
and Arabic/Persian, to confirm the original meaning, the availability of such
interlinear tools allows for comparison by language learners who, although
as per the letter, learning the original language is not required in the
Bahá'í Faith, the learning of the original is very much praised as evident in
the quotations at <https://bahai9.com/wiki/Persian> and <https://bahai9.com/wiki/Arabic>.

- Our software tool is not confined to displaying translations multilinearly.
For example, the version of the Qur'án herein included also provide notes
which can be viewed interlinearly (from translators whose works were, at least
for the time when translations into English were not as abundant, [recommended
for use or study by Bahá'ís](http://bahai-library.com/quran_rodwell_sale_zamir#B.%20Quotations%20in)),
and study of such notes was even [recommended by Shoghi Effendi](https://bahai9.com/wiki/Qur'%C3%A1n#How_to_Study_the_Qur.27.C3.A1n).
More such non-translation fields, including automated ones, are planned. And
the tool can even be used for viewing merely the paragraph number and a single
language of text. (While the notes of Rodwell were not recommended, and are
indeed often antagonistic or skeptical of His Holiness Muhammad, they are
provided largely for the sake of Biblical cross-references, and can be selectively
omitted from view.)
