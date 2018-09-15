# 0.19.4

- npm: Update textbrowser

# 0.19.3

- npm: Update textbrowser

# 0.19.2

- npm: Update textbrowser

# 0.19.1

- npm: Update textbrowser

# 0.19.0

- npm: Update textbrowser

# 0.18.0

- npm: Update textbrowser

# 0.17.1

- npm: Update textbrowser

# 0.17.0

- Enhancement: Ensure local-notes is more portable by adding positioning
    via JavaScript instead of CSS
- npm: Update textbrowser and devDeps
- Linting (ESLint): Overwrite new "standard" config

# 0.16.1

- Service worker: Bump cache

# 0.16.0

- Fix: Add load-stylesheets to offline cache
- Fix: Update textbrowser to 0.22.1
- Enhancement: Have local-notes textareas fill entire cell
- Enhancement (Aqdas): Put tooltips-English in more convenient
    position (after paragraph number)

# 0.15.5

- npm: Actually apply `package-lock.json` changes
- npm: Update textbrowser to 0.22.0

# 0.15.4

- npm: Actually update textbrowser to 0.21.4 (had missed 0.21.3); includes
    security fix
- Change: Add `max-height` to iframes with `fill-available` (for larger screens)
- Change: Increase width of iframes with `fill-available`

# 0.15.3

- npm: Update textbrowser to 0.21.3

# 0.15.2

- Fix IDB namespace to reflect this repo
- npm: Update textbrowser to 0.21.2

# 0.15.1

- Fix: Update to textbrowser to 0.21.1

# 0.15.0

- Fix: Update to textbrowser to 0.21.0
- yarn: Remove yarn support
- npm: Add `.npmignore`
- Git: Add to `.gitignore` for server

# 0.14.1

- Fix: Offline for tooltip CSS

# 0.14.0

- npm: Update devDeps
- Enhancement: Add tooltips plugin (using tippy.js) and apply to
    English->Arabic

# 0.13.1

- npm: Bump textbrowser

# 0.13.0

- npm: Bump textbrowser and other deps/devDeps

# 0.12.0

- npm: Update deps, devDeps
- Update service worker per TextBrowser updates (as well as move to
    `user.json` file per new requirements)
- Some added logging

# 0.11.3

- Attempt to force service worker (and updated files) cache invalidation

# 0.11.2

- Fix: Surface TextBrowser missing plugin fix

# 0.11.1

- Fix: Surface TextBrowser base path fixes

# 0.11.0

- Enhancement: Update plugins per new textbrowser expected
    format (now usable!)
- Enhancement: Add reverse-roman plugin for possible future use
- Tweak: Change i18n of Chinese numbers field to reflect applicable
    field name (but not conflict with one existing in db already)
- Remove currently unused or unneeded plug-in applications
- Add wikilinks argument for the Aqdas, roman for gleanings
- Implement chinese-numbers, roman-numerals, wikilinks.js, local-notes,
    ISBN (latter not currently in use)
- Schema fix: Ensure Arabic denotes it has HTML
- npm: Update textbrowser to 0.18.1; plug-ins! Also add new
    babel dependencies required for `import` resolution
    and server usage

# 0.10.0

- npm: Let `opn`/`node-static` be normal deps for running server
- npm: Provide sample server scripts
- npm: Bump `textbrowser` version
- Fix offline when `index.html` omitted
- Fix: Avoid Chrome DevTools error message
- Fix: Ensure babel-polyfill is cached by service worker

# 0.9.0

- npm: Bump textbrowser dep and adjust service-worker file accordingly

# 0.8.1

- npm: Bump textbrowser version for fix re: loading message being left
    too early

# 0.8.0

- Refactoring: Add `load-stylesheets` in preparation for favicon loading
    (also used by TextBrowser)
- Refactoring: Use `await`/`async` in service worker
- Linting: `.eslintignore`
- Testing: Optimize promise retrieval
- npm: Update TextBrowser (allowing more robust format for loading stylesheets;
    also may fix possible service worker registration issue)
- npm: Update deps, devDeps
- npm: Add ESLint to testing and server-starting scripts

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
