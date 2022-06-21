const express = require('express');
const router = require('./routes');
// ...

const app = express();

app.use(express.json());
app.use('/', router); // colocamos essa linha e a linha 2 para fazemos as rotas da API

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
