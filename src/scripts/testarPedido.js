const Pedido = require("../models/pedido");
const { ObjectId } = require("mongodb");

async function testarPedido() {
  // Substitua pelos _id reais do banco
  //Notebook X :68401898060f3028027a011c
  //Cabo USB: 68401898060f3028027a011d
  //antonio: 684016c1ce07c2a7dfa95cc0
  const usuarioId = new ObjectId("684016c1ce07c2a7dfa95cc0");
  const produtoId1 = new ObjectId("68401898060f3028027a011c"); 
  const produtoId2 = new ObjectId("68401898060f3028027a011d");

  const itens = [
    { produtoId: produtoId1, quantidade: 1 },
    { produtoId: produtoId2, quantidade: 2 }
  ];

  const pedido = new Pedido(usuarioId, itens);
  await pedido.inserir();
}

testarPedido();
