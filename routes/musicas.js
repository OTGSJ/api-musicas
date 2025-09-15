const express = require("express");
const router = express.Router();
const db = require("../database/init-db");

// Feature 1: GET /api/musicas - Obter todas as músicas
router.get("/", (req, res) => {
  const sql = "SELECT * FROM musicas";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Músicas obtidas com sucesso",
      data: rows,
    });
  });
});

// Feature 2: POST /api/musicas - Adicionar uma nova música
router.post("/", (req, res) => {
  const { titulo, artista, album, ano_lancamento, genero } = req.body;

  if (!titulo || !artista) {
    return res
      .status(400)
      .json({ error: "Título e artista são obrigatórios." });
  }

  const sql = `INSERT INTO musicas (titulo, artista, album, ano_lancamento, genero) VALUES (?, ?, ?, ?, ?)`;
  const params = [titulo, artista, album, ano_lancamento, genero];

  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({
      message: "Música adicionada com sucesso!",
      data: { id: this.lastID, ...req.body },
    });
  });
});

module.exports = router;
