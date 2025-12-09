import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import jsonPlugin from "@eslint/json";
import { defineConfig } from "eslint/config";
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from "eslint-plugin-react";

export default defineConfig([
    {
        ignores: ['node_modules/**', '.next/**', 'build/**', 'package-lock.json', 'yarn.lock']
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ['**/*.{jsx,tsx}'],
        plugins: { jsxA11y },
        rules: {
            "jsxA11y/alt-text": "error",
            "jsxA11y/anchor-is-valid": "warn",
            "jsxA11y/label-has-associated-control": "error",
            "jsxA11y/control-has-associated-label": "error",
            "jsxA11y/no-static-element-interactions": "warn",
            "jsxA11y/aria-props": "error",
            "jsxA11y/aria-role": "error",
            "jsxA11y/media-has-caption": "warn",
            "jsxA11y/no-autofocus": "warn",
            "jsxA11y/heading-has-content": "error",
            "jsxA11y/no-redundant-roles": "warn",
        },
    },
    {
        files: ["**/*.json"],
        language: "json/json",
        plugins: { json: jsonPlugin },
    },


    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        plugins: { next: nextPlugin },
        rules: {
            "next/no-html-link-for-pages": "off",
            "next/no-img-element": "warn",
            "next/no-script-component-in-head": "error",
            "next/no-head-element": "error",
            "next/no-document-import-in-page": "error",
        },
    },
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: { react: reactPlugin },
        rules: {
            "react/jsx-filename-extension": [
                "warn",
                { extensions: [".js", ".jsx", ".ts", ".tsx"] }
            ],
            "react/jsx-indent": ["error", 4],
            "react/no-unknown-property": [1, { ignore: ["key", "jsx"] }],
            "react/react-in-jsx-scope": "off",
        },
        settings: {
            react: {
                version: "detect", // Automatically detects React version from package.json
            },
        },
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
            parserOptions: { project: "./tsconfig.json", tsconfigRootDir: import.meta.dirname },
        },
        rules: {
            // JS / TS style
            'camelcase': ['error', { properties: 'never' }],
            'comma-dangle': ['warn', { arrays: 'always-multiline', objects: 'always-multiline', imports: 'always-multiline', exports: 'always-multiline', functions: 'always-multiline' }],
            'comma-spacing': ['error', { before: false, after: true }],
            'eol-last': ['error', 'always'],
            'indent': ['error', 4, { SwitchCase: 1 }],
            'keyword-spacing': ['error', { before: true }],
            'no-console': 'off',
            'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
            'no-trailing-spaces': 'error',
            'object-curly-spacing': ['error', 'always'],
            'quotes': ['error', 'single'],
            'semi': ['error', 'always'],
            'semi-spacing': ['error', { before: false, after: true }],
            'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
            'space-in-parens': ['error', 'never'],
            'space-infix-ops': ['error', { int32Hint: false }],
            'space-unary-ops': [2, { words: true, nonwords: false }],

            // typescript specific
            'no-unused-vars': ['warn', { vars: 'all', args: 'none', ignoreRestSiblings: true }]
        }
    }
]);
