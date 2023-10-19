module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
        'eol-last': ["error", "always"],
        'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 0 }],
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'semi': ['error'],
        'sort-imports': ['error', {
            'memberSyntaxSortOrder': ['none', 'all', 'single', 'multiple']
        }]
    }
}
