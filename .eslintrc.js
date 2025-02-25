module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": ["eslint:recommended"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "indent": ["error", 4],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-unused-vars": ["warn"],
        "no-console": ["warn"],
        "no-undef": ["error"],
        "object-curly-spacing": ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "eol-last": ["error", "always"]
    }
}
