const app = require("./app");
const port = 8080;

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
