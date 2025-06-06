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
    try {
      const usuario = await db.collection("usuarios").findOne({ _id: this.usuarioId });
      if (!usuario) {
        throw new Error("Usuário não encontrado.");
      }

      const produtoIds = this.itens.map(item => item.produtoId);
      const produtos = await db.collection("produtos")
        .find({ _id: { $in: produtoIds } })
        .toArray();

      if (produtos.length !== this.itens.length) {
        throw new Error("Um ou mais produtos não existem.");
      }

      for (let item of this.itens) {
        const produto = produtos.find(p => p._id.equals(item.produtoId));
        if (!produto) continue;
        if (produto.estoque < item.quantidade) {
          throw new Error(`Estoque insuficiente para o produto: ${produto.nome}`);
        }
        item.precoUnitario = produto.preco;
        this.valorTotal += produto.preco * item.quantidade;
      }
    } finally {
      client.close();
    }
  }

  async inserir() {
    let client;
    try {
      await this.validar();

      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const pedidoData = {
        usuarioId: this.usuarioId,
        itens: this.itens,
        valorTotal: this.valorTotal,
        dataPedido: this.dataPedido,
      };

      const result = await db.collection("pedidos").insertOne(pedidoData);
      console.log("Pedido inserido:", result.insertedId);

      for (let item of this.itens) {
        await db.collection("produtos").updateOne(
          { _id: item.produtoId },
          { $inc: { estoque: -item.quantidade } }
        );
      }
    } catch (error) {
      Logger.log("Erro ao inserir pedido: " + error);
    } finally {
      client?.close();
    }
  }

  static async buscar(filtro = {}) {
    let client;
    try {
      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const pedidos = await db.collection("pedidos").find(filtro).toArray();
      console.log("Pedidos encontrados:", pedidos);
    } catch (error) {
      Logger.log("Erro ao buscar pedidos: " + error);
    } finally {
      client?.close();
    }
  }

  static async deletar(filtro) {
    let client;
    try {
      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const result = await db.collection("pedidos").deleteMany(filtro);
      console.log("Pedidos deletados:", result.deletedCount);
    } catch (error) {
      Logger.log("Erro ao deletar pedidos: " + error);
    } finally {
      client?.close();
    }
  }

  static async atualizar(filtro, novosDados) {
    let client;
    try {
      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const result = await db.collection("pedidos").updateOne(filtro, { $set: novosDados });
      console.log("Pedidos atualizados:", result.modifiedCount);
    } catch (error) {
      Logger.log(`Erro ao atualizar pedidos com filtro ${JSON.stringify(filtro)}: ${error}`);
    } finally {
      client?.close();
    }
  }
}

module.exports = Pedido;
