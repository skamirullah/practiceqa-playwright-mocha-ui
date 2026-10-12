import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: { globals: { ...globals.node, ...globals.mocha } },
    rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] },
  },
  { ignores: ['reports/', 'artifacts/', 'node_modules/'] },
];
