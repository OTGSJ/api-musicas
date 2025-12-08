const request = require('supertest');
const app = require('../app'); // Importa o app express configurado

describe('Testes da API de Músicas', () => {
    
    // Variável para armazenar o ID de uma música criada para testar o DELETE
    let musicaCriadaId;

    // --- TESTE DA ROTA POST ---
    describe('POST /api/musicas', () => {
        it('Deve criar uma nova música com sucesso', async () => {
            const novaMusica = {
                titulo: "Teste Jest Song",
                artista: "Jest Artist",
                album: "Test Album",
                anoLancamento: 2024,
                genero: "Test Rock"
            };

            const response = await request(app)
                .post('/api/musicas')
                .send(novaMusica);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'Música adicionada com sucesso!');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data.titulo).toBe(novaMusica.titulo);

            // Salva o ID para usar no teste de DELETE
            musicaCriadaId = response.body.data.id;
        });

        it('Deve retornar erro 400 se faltar título ou artista', async () => {
            const musicaInvalida = {
                album: "Album Sem Titulo"
            };

            const response = await request(app)
                .post('/api/musicas')
                .send(musicaInvalida);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error', 'Título e artista são obrigatórios.');
        });
    });

    // --- TESTE DA ROTA GET ---
    describe('GET /api/musicas', () => {
        it('Deve retornar uma lista de músicas', async () => {
            const response = await request(app).get('/api/musicas');

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
            // Verifica se a música criada no POST anterior está na lista
            const musicaEncontrada = response.body.data.find(m => m.id === musicaCriadaId);
            expect(musicaEncontrada).toBeDefined();
        });
    });

    // --- TESTE DA ROTA DELETE ---
    describe('DELETE /api/musicas/:id', () => {
        it('Deve deletar a música criada anteriormente', async () => {
            const response = await request(app).delete(`/api/musicas/${musicaCriadaId}`);
            
            // 204 No Content é o padrão para delete com sucesso
            expect(response.status).toBe(204);
        });

        it('Deve retornar 404 ao tentar deletar uma música que não existe', async () => {
            const idInexistente = 999999;
            const response = await request(app).delete(`/api/musicas/${idInexistente}`);

            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('error', 'Música não encontrada.');
        });
    });
});