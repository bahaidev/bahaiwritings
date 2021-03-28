'use strict';

module.exports = {
  extends: ['ash-nazg/sauron', 'plugin:testcafe/recommended'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    sourceType: 'module'
  },
  settings: {
    polyfills: [
      'console',
      'Date.now',
      'document.body',
      'document.dir',
      'document.hasFocus',
      'document.querySelectorAll',
      'Error',
      'fetch',
      'JSON',
      'location.href',
      'location.host',
      'location.protocol',
      'Object.entries',
      'Object.values',
      'Promise',
      'Request',
      'SpeechSynthesisUtterance',
      'URL',
      'window',
      'window.getSelection'
    ]
  },
  overrides: [
    {
      files: ['*.html'],
      rules: {
        'import/unambiguous': 0
      }
    },
    {
      files: ['sw.js', 'test/bahaiwritingsTests.js'],
      rules: {
        'import/unambiguous': 0,
        strict: 0
      }
    },
    {
      files: ['test/bahaiwritingsTests.js', '.eslintrc.js'],
      env: {
        mocha: true,
        node: true
      },
      extends: [
        'ash-nazg/sauron-node',
        'plugin:node/recommended-script'
      ],
      rules: {
        'import/no-commonjs': 0
      }
    }
  ],
  env: {
    node: false,
    browser: true
  },
  rules: {
    'max-len': 0,
    'no-console': 0,
    'no-shadow': 0,
    // Reenable and add descriptions for `eslint-env`
    'eslint-comments/require-description': 0
  }
};
