// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  extends: ['airbnb-base', 'plugin:import/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true,
    node: true,
  },
  rules: {
    'no-underscore-dangle': 0,
    'linebreak-style': 0,
    // https://github.com/prettier/eslint-config-prettier#special-rules
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules
    curly: ['error', 'all'],
    'no-tabs': 'error',
    'no-unexpected-multiline': 'error',
  },
  plugins: ['prettier'],

  // TypeScript
  overrides: [
    {
      files: ['**/*.ts'],
      extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        allowImportExportEverywhere: true,
        project: 'tsconfig.json',
      },
      env: {
        browser: true,
        node: true,
      },
      rules: {
        'class-methods-use-this': 'warn',
        '@typescript-eslint/no-this-alias': 'warn',
        'no-underscore-dangle': 0,
        'linebreak-style': 0,

        // https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            ts: 'never',
          },
        ],

        // https://github.com/prettier/eslint-config-prettier#special-rules
        // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base/rules
        curly: ['error', 'all'],
        'no-tabs': 'error',
        'no-unexpected-multiline': 'error',
      },
      plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
    },
  ],
};
