const { fixupConfigRules, fixupPluginRules } = require('@eslint/compat');
const js = require('@eslint/js');
const globals = require('globals');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');

module.exports = [
  {
    ignores: ['.cache/**', 'node_modules/**', 'public/**', 'docs/**'],
  },
  js.configs.recommended,
  ...fixupConfigRules(react.configs.flat.recommended),
  ...fixupConfigRules(react.configs.flat['jsx-runtime']),
  ...fixupConfigRules(jsxA11y.flatConfigs.recommended),
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        __PATH_PREFIX__: 'readonly',
      },
    },
    plugins: {
      'react-hooks': fixupPluginRules(reactHooks),
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^(event|props)$',
          varsIgnorePattern: '^React$',
        },
      ],
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'react/prop-types': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
];
