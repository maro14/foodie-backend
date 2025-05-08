import globals from 'globals';

export default [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    files: ['**/*.js'],
    rules: {
      // Error prevention - relaxed
      'no-console': 'off', // Allow console usage
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }], // Downgraded to warning
      'no-undef': 'warn', // Downgraded to warning
      'no-var': 'warn', // Downgraded to warning
      'prefer-const': 'warn', // Downgraded to warning

      // Style consistency - relaxed
      'indent': ['warn', 4], // Changed to 4 spaces and downgraded to warning
      'linebreak-style': 'off', // Disabled line ending checks
      'quotes': ['warn', 'single', { avoidEscape: true }], // Downgraded to warning
      'semi': ['warn', 'always'], // Downgraded to warning
      'comma-dangle': 'off', // Disabled trailing comma checks
      'object-curly-spacing': 'off', // Disabled spacing checks
      'array-bracket-spacing': 'off', // Disabled spacing checks

      // Best practices - relaxed
      'eqeqeq': 'warn', // Downgraded to warning
      'no-return-await': 'off', // Disabled
      'require-await': 'warn', // Downgraded to warning
      'arrow-body-style': 'off', // Disabled
      'arrow-parens': 'off', // Disabled
      'no-multiple-empty-lines': 'off', // Disabled
      'max-len': ['warn', { code: 120, ignoreComments: true, ignoreStrings: true }] // Increased line length
    }
  },
  {
    files: ['**/*.test.js'],
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off', // Disabled for test files
    }
  }
];
