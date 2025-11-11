const globals = require("globals");
const pluginJest = require("eslint-plugin-jest");

module.exports = [
    // Configuração padrão de recomendações
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "commonjs",
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        rules: {
            "no-unused-vars": ["warn", { "args": "none" }],
            "semi": ["error", "always"],
            "quotes": ["error", "double"],
            "indent": ["error", 2],
            "camelcase": ["warn", { "properties": "always" }],
            "no-console": "off",
        },
    },

    {
        files: ["tests/**/*.js"],
        ...pluginJest.configs.recommended,
        languageOptions: {
            globals: globals.jest,
        },
        rules: {
        }
    }
];