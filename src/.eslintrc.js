module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base', "plugin:prettier/recommended", "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  pulgns : ["prettier"],
  rules: {
    "indent" : [false],
    "prettier/prettier": "error"
  },
};
