module.exports = {
  "parser": "@typescript-eslint/parser",

  "extends": [
    "react-app",
  ],

  "parserOptions": {
    "sourceType": "module",
    "requireConfigFile": false,
    "ecmaVersion": 7,
    "ecmaFeatures": {
      "modules": true,
      "tsx": true
    },
    "babelOptions": {
      "parserOpts": {
        "plugins": ["tsx"]
      }
    }
  },

  "plugins": [
    "@typescript-eslint",
  ],

  "rules": {
    "react-hooks/exhaustive-deps": 0
  },
};