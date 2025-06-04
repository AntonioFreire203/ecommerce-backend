const { connect } = require("../db/db");
const Logger = require("../utils/logger");

class Pedido {
  constructor(usuarioId, itens) {
    this.usuarioId = usuarioId;
    this.itens = itens;
    this.dataPedido = new Date();
    this.valorTotal = 0;
  }

  async validar() {
    if (!Array.isArray(this.itens) || this.itens.length === 0) {
      throw new Error("O pedido deve conter ao menos um item.");
    }

    const { db, client } = await connect();

    const usuario = await db.collection("usuarios").findOne({ _id: this.usuarioId });
    if (!usuario) {
      client.close();
      throw new Error("Usuário não encontrado.");
    }

    const produtoIds = this.itens.map(item => item.produtoId);
    const produtos = await db.collection("produtos")
      .find({ _id: { $in: produtoIds } })
      .toArray();

    if (produtos.length !== this.itens.length) {
      client.close();
      throw new Error("Um ou mais produtos não existem.");
    }

    // Validar e calcular o valor total
    for (let item of this.itens) {
      const produto = produtos.find(p => p._id.equals(item.produtoId));

      if (!produto) continue;

      if (produto.estoque < item.quantidade) {
        client.close();
        throw new Error(`Estoque insuficiente para o produto: ${produto.nome}`);
      }

      item.precoUnitario = produto.preco;
      this.valorTotal += produto.preco * item.quantidade;
    }

    client.close();
  }

  async inserir() {
    try {
      await this.validar();

      const { db, client } = await connect();

      const pedidoData = {
        usuarioId: this.usuarioId,
        itens: this.itens,
        valorTotal: this.valorTotal,
        dataPedido: this.dataPedido,
      };

      const result = await db.collection("pedidos").insertOne(pedidoData);
      console.log("Pedido inserido:", result.insertedId);

      // Atualizar o estoque dos produtos
      for (let item of this.itens) {
        await db.collection("produtos").updateOne(
          { _id: item.produtoId },
          { $inc: { estoque: -item.quantidade } }
        );
      }

      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir pedido: " + error);
    }
  }
}

module.exports = Pedido;
