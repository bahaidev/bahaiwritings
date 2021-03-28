# bahaiwritings CHANGES

## 0.31.0

- Dev security: Use server (http-server) without vulnerabilities
- npm: Update `simple-get-json`, `textbrowser`

## 0.30.0

- Change: Drop core-js-bundle and regenerator-runtime dependencies
- Linting (ESLint): As per latest ash-nazg
- npm: Update textbrowser, simple-get-json and devDeps.

## 0.29.2

- Fix: Force service worker version update

## 0.29.1

- npm: Update textbrowser

## 0.29.0

- Linting (ESLint): Latest as per ash-nazg
- npm: Update deps. (textbrowser, core-js-bundle, regenerator-runtime,
    tippy.js), devDeps

## 0.28.0

- Update: Change Tippy entrance path as per change
- Update: Change `simple-get-json` API
- Linting (ESLint): Latest as per ash-nazg
- npm: Change/Rename `start-no-open`/`start` to `start` and `open` and
  change `open` and `open-test` for parallelization and avoiding a race
  condition; also parallelize `test` and use `npm-run-all` with `test` and
  `browser-test`
- npm: Switch to non-deprecated `@rollup/plugin-node-resolve`
- npm: Update `core-js-bundle`, `json-refs`, `open-cli`, `simple-get-json`,
  `regnerator-runtime` and `tippy` deps and devDeps (and `tippy` copy)

## 0.27.0

- Linting (ESLint): Update per latest config (esp. jsdoc)
- Linting (ESLint): Update and move to 2 sp.; apply to MD, HTML JS
- Maintenance: Add `.editorconfig`
- Testing: Switch from end-of-lifed nodeunit to mocha+chai
- Testing fix: Test polyfill paths
- npm: Update devDeps, deps: textbrowser, core-js-bundle, tippy.js
- npm: Update opn-cli -> open-cli
- npm: @babel/polyfill -> regenerator-runtime/core-js

## 0.26.0

- Update: Use new SW API for client and server
- npm: Update devDeps, textbrowser dep.

## 0.25.2

- Fix: Add no-op when output is null (to avoid auto-replacement)

## 0.25.1

- Fix: Ensure indexes plugin does not fail when data is not present for
    a given verse.

## 0.25.0

- Enhancement: Add indexes plugin (and apply to Aqdas)
- npm: Rename `copy`->`copy-tb` to avoid confusion if need to package
    own files

## 0.24.0

- Build: Add routine for bundling `tippy.js`, as its ESM bundle is
    no longer self-sufficient (needs `popper.js`)
- npm: Update `tippy.js`, devDeps

## 0.23.1

- Fix: Actually update TB to 0.30.0

## 0.23.0

- Fix: Make speech plugin independent of language
- Enhancement: Add languages page title per TB update
- Enhancement: Cache actually used dialog-polyfill stylesheet
- Refactoring: Avoid adding the dialog polyfill and stylesheet which
    textbrowser now imports for us; point to new modular path
- Linting (ESLint): Add recommended extension to `.eslintrc` (.js); apply
    ash-nazg rules
- Linting (ESLint): Add testcafe plugin
- Testing: Add accessibility and UI tests (testcafe); not currently
    functioning properly
- npm: Update devDeps, `json-refs`, `@babel/polyfill`, `textbrowser`

## 0.22.1

- Fix: Update Service Worker cache

## 0.22.0

- Fix: Update TextBrowser for fixes and updates
- Testing: Fix paths
- npm: Fix test script
- npm: Update devDep ajv

## 0.21.1

- Fix: Add proper directionality to speech column
- Fix: Avoid duplicate runs of `done`
- Fix: Add speech plugin file to files to cache offline
- npm: Update textbrowser to be able to get language directionality

## 0.21.0

- Enhancement: Speech plugin (applied to Kitáb-i-Aqdas Arabic)

## 0.20.0

- Update: Use new TextBrowser Babel 7 and `simple-get-json` updates
- Refactoring: Avoid `server.js` file in favor of node-static CLI
- Build: Rename script from `copy-textbrowser` -> `copy`; ensure copy
    is copying server files
- npm: Add `server-activate` script
- npm: Update to Babel 7; update `tippy.js`; update devDeps;
    avoid unneeded dependencies

## 0.19.4

- npm: Update textbrowser

## 0.19.3

- npm: Update textbrowser

## 0.19.2

- npm: Update textbrowser

## 0.19.1

- npm: Update textbrowser

## 0.19.0

- npm: Update textbrowser

## 0.18.0

- npm: Update textbrowser

## 0.17.1

- npm: Update textbrowser

## 0.17.0

- Enhancement: Ensure local-notes is more portable by adding positioning
    via JavaScript instead of CSS
- npm: Update textbrowser and devDeps
- Linting (ESLint): Overwrite new "standard" config

## 0.16.1

- Service worker: Bump cache

## 0.16.0

- Fix: Add load-stylesheets to offline cache
- Fix: Update textbrowser to 0.22.1
- Enhancement: Have local-notes textareas fill entire cell
- Enhancement (Aqdas): Put tooltips-English in more convenient
    position (after paragraph number)

## 0.15.5

- npm: Actually apply `package-lock.json` changes
- npm: Update textbrowser to 0.22.0

## 0.15.4

- npm: Actually update textbrowser to 0.21.4 (had missed 0.21.3); includes
    security fix
- Change: Add `max-height` to iframes with `fill-available` (for larger screens)
- Change: Increase width of iframes with `fill-available`

## 0.15.3

- npm: Update textbrowser to 0.21.3

## 0.15.2

- Fix IDB namespace to reflect this repo
- npm: Update textbrowser to 0.21.2

## 0.15.1

- Fix: Update to textbrowser to 0.21.1

## 0.15.0

- Fix: Update to textbrowser to 0.21.0
- yarn: Remove yarn support
- npm: Add `.npmignore`
- Git: Add to `.gitignore` for server

## 0.14.1

- Fix: Offline for tooltip CSS

## 0.14.0

- npm: Update devDeps
- Enhancement: Add tooltips plugin (using tippy.js) and apply to
    English->Arabic

## 0.13.1

- npm: Bump textbrowser

## 0.13.0

- npm: Bump textbrowser and other deps/devDeps

## 0.12.0

- npm: Update deps, devDeps
- Update service worker per TextBrowser updates (as well as move to
    `user.json` file per new requirements)
- Some added logging

## 0.11.3

- Attempt to force service worker (and updated files) cache invalidation

## 0.11.2

- Fix: Surface TextBrowser missing plugin fix

## 0.11.1

- Fix: Surface TextBrowser base path fixes

## 0.11.0

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

## 0.10.0

- npm: Let `opn`/`node-static` be normal deps for running server
- npm: Provide sample server scripts
- npm: Bump `textbrowser` version
- Fix offline when `index.html` omitted
- Fix: Avoid Chrome DevTools error message
- Fix: Ensure babel-polyfill is cached by service worker

## 0.9.0

- npm: Bump textbrowser dep and adjust service-worker file accordingly

## 0.8.1

- npm: Bump textbrowser version for fix re: loading message being left
    too early

## 0.8.0

- Refactoring: Add `load-stylesheets` in preparation for favicon loading
    (also used by TextBrowser)
- Refactoring: Use `await`/`async` in service worker
- Linting: `.eslintignore`
- Testing: Optimize promise retrieval
- npm: Update TextBrowser (allowing more robust format for loading stylesheets;
    also may fix possible service worker registration issue)
- npm: Update deps, devDeps
- npm: Add ESLint to testing and server-starting scripts

## 0.7.1

- npm: Update TextBrowser (allowing dynamic loading of stylesheets)

## 0.7.0

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

## 0.6.1

- Apply TB fix for interlinear and checked interaction

## 0.6.0

- Apply TB interlinear improvements

## 0.5.0

- Apply TB interlinear fixes

## 0.4.3

- Apply fix for *TextBrowser* issue with `anchor` and aliases

## 0.4.2

- Apply fix for *TextBrowser* issue with aliases

## 0.4.1

- Ensure English column of Peace statement formatted as HTML (has nbsp's)

## 0.4.0

- Enhancement: Service worker and dialogs as per *TextBrowser* update
- npm: ESLint script
- Linting: `outerIIFEBody` indent rule
- Update options
- Remove Collins from `files.json` for now (working but large and of
    questionable interest to regular users)
- Refactoring (Breaking): Remove array `includes` polyfill (relying on
    other modern features)
- Refactoring: Remove `.htaccess` as no longer using AppCache

## 0.3.0

- Various schema fixes/changes, especially oriented for new
    `textbrowser` release, which is now minimally functional
    though with currently slow performance due to lack of caching.

## 0.2.0

- BREAKING: Follow i18n changes of `textbrowser` in
    metadata, files, site, etc.

## 0.1.0

- Initial version
