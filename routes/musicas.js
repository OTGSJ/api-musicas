const express = require('express');
const router = express.Router();
const db = require('../database/init-db');

// Feature 1: GET /api/musicas - Obter todas as músicas
router.get('/', (req, res) => {
  const sql = "SELECT * FROM musicas";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "Músicas obtidas com sucesso",
      data: rows
    });
  });
});

module.exports = router;