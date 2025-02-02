import globals from 'globals';
import pluginJs from '@eslint/js';


/** @type {import('eslint').Linter.Config[]} */
export default [{
    languageOptions: { 
        globals: {
            ...globals.browser,
            ...globals.node,
        },
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    rules: {
        // 'no-unresolved': ['error'],
        'quotes': ['error', 'single'],
        'indent': ['error', 4],
        'semi': ['error', 'always']
    },
},
pluginJs.configs.recommended,
];