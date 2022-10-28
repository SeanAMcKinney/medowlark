module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
        "jest": true,
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-console": "off",
    }
}
