const request = require("supertest");
const app = require("../app");
const db = require("../database/init-db");

describe("Testes da API de Músicas", () => {
  afterAll((done) => {
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Conexão com o banco de dados de teste fechada.");
      done();
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
  });

  // Teste para a rota POST /api/musicas
  describe("POST /api/musicas", () => {
    it("deve adicionar uma nova música e retornar status 201", async () => {
      const novaMusica = {
        titulo: "Tempo Perdido",
        artista: "Legião Urbana",
        album: "Dois",
        ano_lancamento: 1986,
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
});
