module.exports = {
  extends: [
    require.resolve('@umijs/max/eslint'),
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    API: 'readonly',
    React: 'readonly',
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'eol-last': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    indent: ['error', 2, { SwitchCase: 1 }],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'space-before-blocks': 'error',
    'keyword-spacing': 'error',
    'space-infix-ops': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'no-undef': 'off', // TypeScript handles this
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
