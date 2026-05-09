import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**', '**/*.min.js', 'docs/**'],
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Legacy components don't follow multi-word naming; lifted in Phase 2 rename.
      'vue/multi-word-component-names': 'off',
      // Allow underscore-prefixed unused vars (intentional discards).
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Phase 3 will tighten this when migrating to <script setup>.
      'vue/no-deprecated-slot-attribute': 'warn',
    },
  },
  eslintConfigPrettier,
];
