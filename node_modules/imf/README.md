# imf

A convenience wrapper for [intl-messageformat](https://github.com/yahoo/intl-messageformat).

# Installation

`npm install imf`

# Usage

```html
<script src="node_modules/intl-messageformat/dist/intl-messageformat-with-locales.min.js"></script>
<script src="node_modules/simple-get-json/index.js"></script>
<script src="node_modules/imf/index.js"></script>
```

# Example

```js
IMF({
    languages: ['zh-CN', 'en-US'],
    callback: function (l, getFormatter /*, enUSLocale, esLocale, ptLocale, zhCNLocale*/) {
        alert(l("Localized value!")); // Looks up "Localized value!" in Chinese file (at "locales/zh-CN.json") and in English (at "locales/en-US.json") if not present in Chinese
        const tk = getFormatter('tablekey');
        alert(tk("Tablekey localized value!")); // Equivalent to l("tablekey.Tablekey localized value!")

        // Note that the following two sets are equivalent
        const tk2 = getFormatter(['tablekey', 'nestedMore']);
        alert(tk2("Tablekey localized value2"));

        const tk3 = getFormatter('tablekey.nestedMore');
        alert(tk3("Tablekey localized value2"));
    }
});
```

JSON file structure:

```json
{
    "Localized value!": "Chinese translation of \"Localized value!\"",
    "tablekey.Tablekey localized value!": "Chinese translation of \"tablekey.Tablekey localized value!\"",
    "tablekey": {
        "nestedMore": {
            "Tablekey localized value2": "Put another Chinese translation of \"tablekey.Tablekey localized value!\" here"
        }
    }
}
```

OR

```json
{
    "Localized value!": "Chinese translation of \"Localized value!\"",
    "tablekey": {
        "Tablekey localized value!": "Chinese translation of \"tablekey.Tablekey localized value!\"",
        "nestedMore": {
            "Tablekey localized value2": "Put another Chinese translation of \"tablekey.Tablekey localized value!\" here"
        }
    }
}
```

OR

```json
{
    "Localized value!": "Chinese translation of \"Localized value!\"",
    "tablekey.Tablekey localized value!": "Chinese translation of \"tablekey.Tablekey localized value!\"",
    "tablekey.nestedMore.Tablekey localized value2": "Put another Chinese translation of \"tablekey.Tablekey localized value!\" here"
}
```

...etc.

# API

## Methods

-   *Constructor(options)* - A constructor (which can be used without
      `new`) to be supplied an options object with the following
      optional properties:

    -   `languages` - Array of BCP 47 language tags in order of preference.
      Can also be a string for a single tag (e.g., "en-US"), or, if not
      supplied, will default to `navigator.language` or `en-US`. Will be
      used as the second argument to the `IntlMessageFormat` constructor.

    -   `locales` - Array of locale objects (see locale JSON file structure
      above). Will set the `locales` property if present. If present,
      `langs` should also be set.

    -   `langs` - Array of BCP 47 language tags. Will be used to preset
      the `langs` property. Should only be provided if `locales` is
      manually provided.

    -   `fallbackLanguages` - Allows a language or set of languages in
      the same format as `languages`. Its message will be supplied to
      the `fallback` callback argument of the formatter function (or
      used in a return value if `fallback` is not `false`) whenever no
      message is found for `languages`.

    -   `namespace` - Initial namespace for the formatter function
      supplied as the first argument to `callback`. Defaults to value
      of `defaultNamespace`. Namespaces may be expressed as an array
      of namespace parts or as a string. Will be used in conjunction
      with a separator. See the example above for an illustration of
      the two allowable JSON file format structures. Note that namespace
      parts can be indefinitely nested whether as sub-objects or as
      additional separator-separated strings.

    -   `defaultNamespace` - Used when a namespace is not provided
      to `getFormatter`. Defaults to empty string.

    -   `defaultSeparator` - Separator to be used with
      namespaces. Defaults to `.`.

    -   `basePath` - Base path for locale file resolution.
      Defaults to `locales/`.

    -   `localeFileResolver` - Accepts a BCP 47 language tag as
      an argument, and should return a file path for obtaining
      the corresponding JSON locale file. Defaults to a function
      which uses `basePath` and then adds `.json` to the supplied
      language tags for the file name within the base path.

    -   `callback` - Invoked upon the IMF() object and supplied with
        the following arguments upon loading of locales:

        1.  A formatter function based on `namespace` (or `defaultNamespace`
            or the empty string if none supplied)

        1.  A generic formatter building function (see `getFormatter` method)

        1.  Retrieved locale files as JSON objects; to get all locale
            files, use `this.locales` from within your callback.

        1.  Retrieved fallback locale files as JSON objects; to get
            all fallback locale files, use `this.fallbackLocales` from
            within your callback.

-   `getFormatter(ns, sep)` - A generic formatter building method; can be
    supplied an optional namespace and optional separator, defaulting
    otherwise to `defaultNamespace` and `defaultSeparator`, respectively.
    The namespace can either be an array of namespace parts or a string
    with the separator already applied. The namespace (along with
    separator interpolated between and after) will be prepended to
    the key supplied by the user when the formatter function is called.
    Will be automatically invoked (and the result supplied to `callback`)
    if `callback` or `languages` is supplied upon instantiation. The
    returned formatter function can be called with the following arguments
    (supplied in order or with a single object with properties of the
    given name):

    1.  `key` - Lookup key for a `IntlMessageFormat`-formatted message in
        the locales file (will be prepended as per the above by any supplied
        namespaces and separators). If no `values` or `formats` objects
        are supplied, the literal value from the locales file will be
        returned without any `IntlMessageFormat` processing. If supplied
        as an array, the last item will be treated as the key whereas the
        prior portions will be treated as a namespace override. Likewise
        if a separator-separated string is supplied.

    1.  `values` - Optional values object (same as accepted by
        `IntlMessageFormat.format()`)

    1.  `formats` - Optional formats object (same as accepted by
        third argument to the `IntlMessageFormat` constructor).

    1.  `fallback` - Optional fallback function or boolean. If a
        function, `fallback` will be called whenever a message cannot
        be found, and will be supplied a single object argument with
        properties, `message`, `langs`, `namespace`, `separator`,
        `key`, `values`, and `formats` and whose return value will
        be used for the return value of the formatter function. Might
        be used to return a different structure to indicate a need
        for different directionality (e.g., if an Arabic message is
        not found, the fallback can be used to return a value which
        can be used to indicate the English one can be displayed left
        to right). If an otherwise non-`false` value is supplied for
        `fallback` (or the argument is omitted), any message for
        `fallbackLocales` (if any) will be returned instead. If no
        message has been found and no fallbacks provided, an error
        will be thrown.

-   `loadLocales(langs, cb, avoidSettingLocales)` - Loads the locale
    file objects. Will be automatically invoked if `callback` or
    `languages` is supplied upon instantiation. The second callback
    argument is optional and will be invoked with each locale
    object as an argument after the locales have loaded (with
    the locales also available as an array of objects on the
    `locales` property (and used by formatters) unless
    `avoidSettingLocales` is supplied).

## Properties

-   `langs` - Will automatically be set (as an array of BCP 47
    language tags) upon calls to `loadLocales` or if the `langs`
    option is supplied upon instantiation. Utilized in error messages
    when no message or fallback message can be found.

-   `locales` - Will automatically be set to an (empty) array. If
    `loadLocales` is run (including by the use of `languages` or
    `callback` options arguments to the constructor), the retrieved
    locale JSON objects will be added to this array. This property
    can also be set as an array of (pre-loaded) locales at instantiation.
    If supplied after instantiation, these will replace any already set.

-   `fallbackLocales` - Will automatically be set to an array. Defaults
    to an empty array. If `fallbackLanguages` is provided, the locale
    JSON objects loaded by `loadLocales` will be added to this array.
    This property can also be set as an array of (pre-loaded) locales
    at instantiation. If supplied after instantiation, these will
    replace any already set. Unless the `fallback` argument provided
    to `getFormatter` is set to `false`, these fallback locales will be
    checked whenever `getFormatter` does not find a message within the
    `locales` property.

-   `fallbackLanguages`  Will automatically be set.

# To-dos

1.  Add logic to recover if file like `en-US.json` is not
    present but `en.json` is (might enhance `getJSON`
    errBack to capture thrown object with file property
    indicating the file causing the error).
