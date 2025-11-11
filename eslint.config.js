const globals = require("globals");
const pluginJest = require("eslint-plugin-jest");

module.exports = [
  // Configuração padrão (para app.js, routes, server, etc.)
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
      // Regras de estilo e qualidade
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
    plugins: {
        jest: pluginJest // Define o plugin sob a chave 'jest'
    },
    languageOptions: {
      globals: globals.jest,
    },
    rules: {
        ...pluginJest.configs.recommended.rules,
    }
  }
];