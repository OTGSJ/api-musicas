const express = require('express');
const app = express();
const port = 8080;
const musicaRoutes = require('./routes/musicas');

app.use(express.json());

// Middleware para arquivos estáticos (para frontend o teste)
app.use(express.static('public'));

// Rota base para as musicas
app.use('/api/musicas', musicaRoutes);

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});