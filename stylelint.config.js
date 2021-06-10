// https://stylelint.io/user-guide/configure
module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    'at-rule-no-unknown': null, // https://github.com/stylelint/stylelint/issues/1612
    // 'no-descending-specificity': null,
  },
};
