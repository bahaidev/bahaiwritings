module.exports = {
  "extends": "ash-nazg/sauron",
  "parser": "babel-eslint",
  "parserOptions": {
      "sourceType": "module"
  },
  "plugins": ["compat"],
  "settings": {
    "polyfills": [
        "url", "promises", "fetch"
    ]
  },
  "overrides": [
      {
        "files": ["sw.js", "test/bahaiwritingsTests.js"],
        "rules": {
            "import/unambiguous": 0,
            "strict": 0
        }
      },
      {
          "files": ["test/bahaiwritingsTests.js"],
          "rules": {
              "import/no-commonjs": 0
          }
      }
  ],
  "env": {
      "node": false,
      "browser": true
  },
  "rules": {
    "indent": ["error", 4, {"outerIIFEBody": 0}],
    "max-len": 0,
    "no-console": 0,
    "no-shadow": 0
  }
};
