module.exports = {
  "extends": ["ash-nazg/sauron", "plugin:testcafe/recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
      "sourceType": "module"
  },
  "plugins": ["compat"],
  "settings": {
    "polyfills": [
        "console",
        "Date.now",
        "document.hasFocus",
        "document.querySelectorAll",
        "Error",
        "fetch",
        "JSON",
        "location.href",
        "location.host",
        "location.protocol",
        "Object.entries",
        "Object.values",
        "Promise",
        "Request",
        "SpeechSynthesisUtterance",
        "URL",
        "window.getSelection"
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
