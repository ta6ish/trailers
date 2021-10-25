module.exports = {
    plugins: ['sonarjs'],
    env: {
        node: true,
        jest: true,
        commonjs: true,
        es2021: true,
    },
    parserOptions: {
        ecmaVersion: 13,
    },
    rules: {},
    extends: ['eslint:recommended', 'plugin:sonarjs/recommended'],
};