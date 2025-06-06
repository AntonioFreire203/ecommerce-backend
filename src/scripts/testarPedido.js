const Pedido = require("../models/pedido");
const { connect } = require("../db/db");

async function testarPedido() {
  const { db, client } = await connect();
  try {
    const usuario = await db.collection("usuarios").findOne({ email: "antonio@example.com" });
    const produto1 = await db.collection("produtos").findOne({ nome: "Teclado Gamer" });
    const produto2 = await db.collection("produtos").findOne({ nome: "Cabo USB" });

    if (!usuario || !produto1 || !produto2) {
      throw new Error("Dados necessários não encontrados. Rode o seed.js.");
    }

    const itens = [
      { produtoId: produto1._id, quantidade: 1 },
      { produtoId: produto2._id, quantidade: 2 }
    ];

    const pedido = new Pedido(usuario._id, itens);
    await pedido.inserir();

  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}
testarPedido();
