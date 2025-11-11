const request = require("supertest");
const app = require("../app");
const db = require("../database/init-db");

describe("Testes da API de Músicas", () => {
  afterAll(() => {
    return new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) {
          console.error(err.message);
          return reject(err);
        }
        console.log("Conexão com o banco de dados de teste fechada.");
        resolve();
      });
    });
  });

  // Teste para a rota GET /api/musicas
  describe("GET /api/musicas", () => {
    it("deve retornar uma lista de músicas e status 200", async () => {
      const response = await request(app).get("/api/musicas");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Músicas obtidas com sucesso");
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it("deve retornar status 500 em caso de erro no banco de dados", async () => {
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

  // Teste para a rota POST /api/musicas
  describe("POST /api/musicas", () => {
    it("deve adicionar uma nova música e retornar status 201", async () => {
      const novaMusica = {
        titulo: "Tempo Perdido",
        artista: "Legião Urbana",
        album: "Dois",
        anoLancamento: 1986,
        genero: "Rock",
      };

      const response = await request(app).post("/api/musicas").send(novaMusica);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Música adicionada com sucesso!");
      expect(response.body.data.titulo).toBe(novaMusica.titulo);
    });

    it("deve retornar erro 400 se o título ou artista não forem fornecidos", async () => {
      const musicaInvalida = {
        album: "Algum Album",
        genero: "Pop",
      };

      const response = await request(app)
        .post("/api/musicas")
        .send(musicaInvalida);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Título e artista são obrigatórios.");
    });
  });

  // Teste para a rota DELETE /api/musicas/:id
  describe("DELETE /api/musicas/:id", () => {
    let musicaParaDeletarId;

    // Hook para criar uma música antes de cada teste de DELETE
    beforeEach(async () => {
      const novaMusica = {
        titulo: "Musica Teste Delete",
        artista: "Artista Teste",
        album: "Album Teste",
        anoLancamento: 2023,
        genero: "Teste",
      };

      const response = await request(app).post("/api/musicas").send(novaMusica);
      musicaParaDeletarId = response.body.data.id;
    });

    it("deve remover uma música existente e retornar status 204", async () => {
      const response = await request(app).delete(
        `/api/musicas/${musicaParaDeletarId}`
      );

      expect(response.status).toBe(204);
      expect(response.body).toEqual({}); // 204 não deve ter corpo
    });

    it("deve retornar status 404 se a música não existir", async () => {
      // Usar um ID que certamente não existe (maior que qualquer ID válido)
      const idInexistente = 999999;
      const response = await request(app).delete(
        `/api/musicas/${idInexistente}`
      );

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Música não encontrada.");
    });
  });
});
