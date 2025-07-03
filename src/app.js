const express = require('express');
const app = express();
const port = 3000;

const categoriaRoutes = require('./routes/categoriaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());

app.use('/categorias', categoriaRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/produtos', produtoRoutes);
app.use('/usuarios', usuarioRoutes);

app.get('/', (req, res) => {
  res.send('Seja Bem Vindo na EcoByte!');
});

app.listen(port, () => {
  console.log(`O Servidor está rodando na http://localhost:${port}`);
});