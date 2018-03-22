# ?

- Enhancement: Add `load-stylesheets` in preparation for favicon loading
    (also used by TextBrowser)

# 0.7.1

- npm: Update TextBrowser (allowing dynamic loading of stylesheets)

# 0.7.0

- Refactoring (Breaking): Switch to ES6 Modules
- Refactoring: Remove (mostly) no longer needed `URLSearchParams` polyfill
- Update: Remove caching of TextBrowser individual files (now that bundled with Rollup)
- Update: Update plug-in format (reflecting TextBrowser changes)
- Linting: ESLint
- npm: Fix ESLint script per https://github.com/eslint/eslint/issues/1663#issuecomment-240066799
- npm: Upgrade dev deps
- npm: Update TextBrowser, remove babel-polyfill (included indirectly),
    update form-serialize references
- Testing: Use babel-polyfill
- Testing: Upgrade JSON Schema draft version (now passing our tests)

# 0.6.1

- Apply TB fix for interlinear and checked interaction

# 0.6.0

- Apply TB interlinear improvements

# 0.5.0

- Apply TB interlinear fixes

# 0.4.3

- Apply fix for *TextBrowser* issue with `anchor` and aliases

# 0.4.2

- Apply fix for *TextBrowser* issue with aliases

# 0.4.1

- Ensure English column of Peace statement formatted as HTML (has nbsp's)

# 0.4.0

- Enhancement: Service worker and dialogs as per *TextBrowser* update
- npm: ESLint script
- Linting: `outerIIFEBody` indent rule
- Update options
- Remove Collins from `files.json` for now (working but large and of
    questionable interest to regular users)
- Refactoring (Breaking): Remove array `includes` polyfill (relying on
    other modern features)
- Refactoring: Remove `.htaccess` as no longer using AppCache

# 0.3.0

- Various schema fixes/changes, especially oriented for new
    `textbrowser` release, which is now minimally functional
    though with currently slow performance due to lack of caching.

# 0.2.0

- BREAKING: Follow i18n changes of `textbrowser` in
    metadata, files, site, etc.

# 0.1.0

- Initial version
