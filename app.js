const express = require('express');
const app = express();
const musicaRoutes = require('./routes/musicas');

app.use(express.json());

// Middleware para arquivos estáticos (para frontend de teste)
app.use(express.static('public'));

// Rota base para as musicas
app.use('/api/musicas', musicaRoutes);

// Exporta o app para ser usado nos testes
module.exports = app;