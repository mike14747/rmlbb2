import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import jsonPlugin from '@eslint/json';
import { defineConfig } from 'eslint/config';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import jsoncParser from 'jsonc-eslint-parser';

export default defineConfig([
    {
        ignores: ['node_modules/**', '.next/**', 'build/**', 'package-lock.json', 'yarn.lock'],
    },

    // javaScript base rules
    js.configs.recommended,

    // typescript base rules
    ...tseslint.configs.recommended,

    {
        // JSX-A11y
        files: ['**/*.{jsx,tsx}'],
        plugins: { jsxA11y },
        rules: {
            'jsxA11y/alt-text': 'error',
            'jsxA11y/anchor-is-valid': 'warn',
            'jsxA11y/label-has-associated-control': 'error',
            'jsxA11y/control-has-associated-label': 'error',
            'jsxA11y/no-static-element-interactions': 'warn',
            'jsxA11y/aria-props': 'error',
            'jsxA11y/aria-role': 'error',
            'jsxA11y/media-has-caption': 'warn',
            'jsxA11y/no-autofocus': 'warn',
            'jsxA11y/heading-has-content': 'error',
            'jsxA11y/no-redundant-roles': 'warn',
        },
    },
    {
        // json
        files: ['**/*.json', '**/*.json5'],
        plugins: { json: jsonPlugin },
        languageOptions: {
            parser: jsoncParser,
        },
        ignores: ['package-lock.json', 'yarn.lock'],
        rules: {
            'no-trailing-spaces': 'error',
            'quotes': ['error', 'double'],
            'eol-last': ['error', 'always'],
            'json/no-dupe-keys': 'error',
        },
    },
    {
        // next.js
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        plugins: { next: nextPlugin },
        rules: {
            'next/no-html-link-for-pages': 'off',
            'next/no-img-element': 'warn',
            'next/no-script-component-in-head': 'error',
            'next/no-head-element': 'error',
            'next/no-document-import-in-page': 'error',
        },
    },
    {
        // react
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: { react: reactPlugin },
        rules: {
            'react/jsx-filename-extension': [
                'warn',
                { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
            ],
            'react/jsx-indent': ['error', 4],
            'react/no-unknown-property': [1, { ignore: ['key', 'jsx'] }],
            'react/react-in-jsx-scope': 'off',
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
    {
        // only for ts/tsx files
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        // global js/ts style rules
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
        rules: {
            'camelcase': ['error', { properties: 'never' }],
            'comma-dangle': ['warn', { arrays: 'always-multiline', objects: 'always-multiline', imports: 'always-multiline', exports: 'always-multiline', functions: 'always-multiline' }],
            'comma-spacing': ['error', { before: false, after: true }],
            'eol-last': ['error', 'always'],
            'indent': ['error', 4, { SwitchCase: 1 }],
            'keyword-spacing': ['error', { before: true }],
            'no-console': 'off',
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'no-trailing-spaces': 'error',
            'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
            'object-curly-spacing': ['error', 'always'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'semi-spacing': ['error', { before: false, after: true }],
            'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
            'space-in-parens': ['error', 'never'],
            'space-infix-ops': ['error', { int32Hint: false }],
            'space-unary-ops': [2, { words: true, nonwords: false }],
        },
    },
]);
