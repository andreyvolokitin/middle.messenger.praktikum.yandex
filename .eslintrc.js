// https://eslint.org/docs/user-guide/configuring
module.exports = {
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'linebreak-style': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],

    // https://github.com/prettier/eslint-config-prettier#special-rules
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules
    curly: ['error', 'all'],
    'no-tabs': 'error',
    'no-unexpected-multiline': 'error',
  },
  plugins: ['prettier'],
  globals: {},
};
