# 1.0.2

-   Properly ensure publishing current tagged version

# 1.0.0

-   Switch to npm over bower

# 0.9.0

-   Critical fix to message finding

# 0.8.0

-   Change `fallbackLocale` property to `fallbackLocales` array. New
    property defaults to an empty array and is populated if
    `fallbackLanguages` is provided. All locales will be checked
    if `getFormatter` does not find a message within the `locales` property.

-   Allow `fallbackLanguages` option to add results to `fallbackLocales`
    property even if no `callback` or `languages` option is provided
    upon instantiation.

-   Supply retrieved `fallbackLocales` to be passed to the `callback` option
    as a fourth argument.

-   Fix `callback` to be invoked on the IMF object (allowing it
    to access properties such as `locales`).

-   Change default behavior of `getFormatter()` to utilize fallbacks
    unless the fourth `fallback` argument is explicitly set to `false`.

-   Add `langs` option so that if `locales` are set without
    `languages` having been provided, corresponding language
    codes can be provided in error messages.

# 0.7.0

-   Allow `locales` property to be set as an option at instantiation
    and added to by `loadLocales`.

# 0.6.0

-   Add property `fallbackLanguages` and utilize in error messages

-   Avoid setting `langs` property for fallback language (for
      `loadLocales` calls with `avoidSettingLocales` set to true)

# 0.5.0

-   Cache Array.isArray, Allow array as ns+key argument or as
    separator-separated string

# 0.4.0

-   Allow `fallback` to be a boolean instead of only a callback;
    will return message of the `fallbackLocale` (as may be determined
    by`fallbackLanguages`).

# 0.3.0

-   Rename `fallbackLanguage` to `fallbackLanguages` for accuracy
    and parity with `languages`

# 0.2.0

-   Allow formatter function to be supplied arguments as an object

-   Add a `fallback` callback argument to the formatter function which,
    whenever a message cannot be found for `languages`, will be supplied
    a single object argument with properties, `message`, `langs`,
    `namespace`, `separator`, `key`, `values`, and `formats` and whose
    return value will be used for the return value of the formatter
    function. Note that `message` will contain the value for the message
    of the `fallbackLanguages` locale if `fallbackLanguage` (or
    `fallbackLocales`) had been supplied.

# 0.1.2

-   Avoid bundling intl-messageformat dependency

# 0.1.1

-   Bug: Avoid double-addition of separator for arrays
