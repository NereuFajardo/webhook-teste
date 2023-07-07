const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// Importando as funções dos arquivos
const rota1 = require('./rota1');


// Adicionando as rotas
app.post('/rota1', rota1);

app.post('/consulta-ddd', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const ddd = phoneNumber.substring(2, 4);

  // Lê o arquivo lista-ddd.json
  fs.readFile('lista-ddd.json', (err, data) => {
    if (err) throw err;
    let dddMapFromFile = JSON.parse(data);
    const location = dddMapFromFile[ddd];

    if (location) {
      res.json(location);
    } else {
      res.status(400).json({ error: 'DDD não encontrado' });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
