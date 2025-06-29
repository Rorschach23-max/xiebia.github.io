module.exports = {
  extends: [require.resolve('@umijs/max/stylelint'), 'stylelint-config-standard'],
  rules: {
    'no-empty-source': null,
    'selector-class-pattern': null,
    'no-descending-specificity': null,
    'font-family-no-missing-generic-family-keyword': null,
    'block-no-empty': true,
    'declaration-block-no-duplicate-properties': true,
    'color-no-invalid-hex': true,
    'comment-no-empty': true,
    'max-nesting-depth': 5,
    'number-max-precision': 4,
    'declaration-block-trailing-semicolon': 'always',
    'unit-no-unknown': true,
    'property-no-unknown': true,
  },
};
