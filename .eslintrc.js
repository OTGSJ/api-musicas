module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true, // Adicionar suporte ao Jest/Supertest
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "no-unused-vars": ["warn", { "args": "none" }], // Avisa sobre variáveis não usadas (exceto argumentos)
    "semi": ["error", "always"], // Força o uso de ponto e vírgula
    "quotes": ["error", "double"], // Força o uso de aspas duplas
    "indent": ["error", 2], // Força indentação de 2 espaços
    "camelcase": ["warn", { "properties": "always" }], // Avisa sobre variáveis não camelCase
    "no-console": "off", // Permite o uso de console.log no projeto
  },
};