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
  const { titulo, artista, album, anoLancamento, genero } = req.body;

  if (!titulo || !artista) {
    return res
      .status(400)
      .json({ error: "Título e artista são obrigatórios." });
  }

  // Nota: corrigi 'ano_lancamento' para corresponder ao banco e 'anoLancamento' do body
  const sql = `INSERT INTO musicas (titulo, artista, album, ano_lancamento, genero) VALUES (?, ?, ?, ?, ?)`;
  const params = [titulo, artista, album, anoLancamento, genero];

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

// Feature 3: DELETE /api/musicas/:id - Remover uma música
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  // 1. Verificar se a música existe
  const checkSql = "SELECT id FROM musicas WHERE id = ?";
  db.get(checkSql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Caso a música não exista, retornar 404
    if (!row) {
      return res.status(404).json({ error: "Música não encontrada." });
    }

    // 2. Se existir, remover
    const deleteSql = "DELETE FROM musicas WHERE id = ?";
    db.run(deleteSql, [id], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (this.changes > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: "Música não encontrada." });
      }
    });
  });
});

module.exports = router;