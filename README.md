# API de Músicas

Uma API REST simples para gerenciar uma playlist de músicas, foi utilizado Node.js, Express e SQLite.

## Pré-requisitos

Pré-requisitos necessários para executar o projeto:

-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)

## Instalação e Execução

Instruções para configurar e rodar a API localmente:

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd api-musicas
    ```

2.  **Instalar as dependências do projeto:**
    ```bash
    npm install
    ```

3.  **Inicializar o banco de dados:**
    ```bash
    node database/init-db.js
    ```

4.  **Inicializar o servidor da API:**
    ```bash
    node app.js
    ```

    O servidor estará rodando em `http://localhost:8080`.

## Rotas da API

A API possui as seguintes rotas disponíveis:

-   #### `GET /api/musicas`
    Retorna uma lista em formato JSON com todas as músicas registradas no banco de dados.

-   #### `POST /api/musicas`
    Adiciona uma nova música à coleção. É necessário enviar um corpo (body) na requisição em formato JSON.
    -   **Corpo da requisição (exemplo):**
        ```json
        {
          "titulo": "Tempo Perdido",
          "artista": "Legião Urbana",
          "album": "Dois",
          "ano_lancamento": 1986,
          "genero": "Rock"
        }
        ```

---

## Workflow de Desenvolvimento com Git

### Workflow Escolhido: GitHub Flow

Para esta API foi utilizado o **GitHub Flow**. Eu escolhi este workflow por sua simplicidade, pois este é um simples gerenciador de playlist de musica, não exigindo tanta complexidade como em outros workflows.

# API de Músicas

[![Docker Pulls](https://badgen.net/docker/pulls/SEU_USUARIO/api-musicas?icon=docker&label=pulls)](https://hub.docker.com/r/SEU_USUARIO/api-musicas)

Uma API REST simples para gerenciar uma playlist...
(resto do arquivo...)