module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  env: {
    es6: true,
    browser: true
  },
  "rules": {
    "semi": 2,
    "react/prop-types": 0,
    "camelcase": 0,
    "max-len": 0,
    "class-methods-use-this": 0,
    "indentSwitchCase": true,
    "react/self-closing-comp": 0,
    "no-console": 0,
    "class-methods-use-this": 1,
    "linebreak-style": 0,
    "jsx-a11y/label-has-for": "off",
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "no-unused-vars": 1,
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    'quote-props': 0,
    'react/jsx-one-expression-per-line': 0,
    'class-methods-use-this': 0,
    'object-curly-newline': ["error", { "consistent": true }],
    "prefer-destructuring": 0,
    "react/destructuring-assignment": 0,
    "no-underscore-dangle": 0
  },
  overrides: [
    {
      files: [
        "**/*.test.js"
      ],
      env: {
        jest: true // now **/*.test.js files' env has both es6 *and* jest
      },
      // Can't extend in overrides: https://github.com/eslint/eslint/issues/8813
      // "extends": ["plugin:jest/recommended"]
      plugins: ["jest"],
      rules: {
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error"
      }
    }
  ]
};