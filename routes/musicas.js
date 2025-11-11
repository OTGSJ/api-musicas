const express = require("express");
const router = express.Router();
const db = require("../database/init-db");

// Feature 1: GET /api/musicas - Obter todas as músicas
describe("GET /api/musicas", () => {

  it("deve retornar status 500 em caso de erro no banco de dados", async () => {
    const db = require("../database/init-db");
    const originalDbAll = db.all;

    db.all = (sql, params, callback) => {
      callback(new Error("Simulated DB Error"), null);
    };

    const response = await request(app).get("/api/musicas");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Simulated DB Error");

    db.all = originalDbAll;
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

  // Feature 3: DELETE /api/musicas/:id - Remover uma música
  router.delete("/:id", (req, res) => {
    const id = req.params.id;

    // 1. Verificar se a música existe
    const checkSql = "SELECT id FROM musicas WHERE id = ?";
    db.get(checkSql, [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Caso o filme/música não exista, a API deverá retornar 404
      if (!row) {
        return res.status(404).json({ error: "Música não encontrada." });
      }

      // 2. Se existir, remover
      const deleteSql = "DELETE FROM musicas WHERE id = ?";
      db.run(deleteSql, [id], function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        // Se o filme/música existir, remover e retornar 204 (No Content)
        // O `this.changes` indica o número de linhas modificadas
        if (this.changes > 0) {
          res.status(204).send(); // Status 204 No Content para DELETE bem-sucedido
        } else {
          // Redundância: Em teoria, a verificação `if (!row)` já pegaria isso.
          res.status(404).json({ error: "Música não encontrada." });
        }
      });
    });

    it("deve retornar status 500 se ocorrer um erro ao buscar no banco de dados", async () => {
      const db = require("../database/init-db");
      const originalDbGet = db.get;

      // Mock para falhar a busca (db.get)
      db.get = (sql, params, callback) => {
        callback(new Error("Simulated GET Error"), null);
      };

      const response = await request(app).delete(
        `/api/musicas/1` // ID fixo, pois a busca irá falhar antes
      );

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Simulated GET Error");

      db.get = originalDbGet; // Restaura a função
    });
  });
});

module.exports = router;