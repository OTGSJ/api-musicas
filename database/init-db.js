const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.sqlite', (err) => {
  if (err) {
    return console.error('Erro ao abrir o banco de dados', err.message);
  }

  console.log('Conectado ao banco de dados SQLite.');

  db.run(`CREATE TABLE IF NOT EXISTS musicas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    artista TEXT NOT NULL,
    album TEXT,
    ano_lancamento INTEGER,
    genero TEXT
  )`, 
    (err) => {
    if (err) {
      return console.error('Erro ao criar a tabela', err.message);
    }
    console.log('Tabela "musicas" criada ou já existente.');

    const stmt = db.prepare("INSERT INTO musicas (titulo, artista, album, ano_lancamento, genero) VALUES (?, ?, ?, ?, ?)");
    stmt.run('Bohemian Rhapsody', 'Queen', 'A Night at the Opera', 1975, 'Rock');
    stmt.run('Faroeste Caboclo', 'Legião Urbana', 'Que País É Este 1978/1987', 1987, 'Rock');
    stmt.finalize((err) => {
      if (err) {
        console.error('Erro ao inserir dados de exemplo', err.message);
      } else {
        console.log('Dados de exemplo inseridos.');
      }
    });
  });
});

module.exports = db;