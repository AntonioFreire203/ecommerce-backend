const { connect } = require("../db/db");
const Logger = require("../utils/logger");

class Produto {
  constructor(nome, descricao, preco, estoque, categoriaId) {
    this.nome = nome;
    this.descricao = descricao || "";
    this.preco = preco;
    this.estoque = estoque;
    this.categoriaId = categoriaId;
    this.disponivel = estoque > 0;
  }

  async validar() {
    if (!this.nome || typeof this.nome !== "string") {
      throw new Error("Nome do produto é obrigatório.");
    }

    if (typeof this.preco !== "number" || this.preco <= 0) {
      throw new Error("O preço deve ser maior que zero.");
    }

    if (!Number.isInteger(this.estoque) || this.estoque < 0) {
      throw new Error("Estoque não pode ser negativo.");
    }

    const { db, client } = await connect();
    try {
      const categoria = await db.collection("categorias").findOne({ _id: this.categoriaId });
      if (!categoria) {
        throw new Error("Categoria informada não existe.");
      }
    } finally {
      client.close();
    }
  }

  static validarAtualizacao(dados) {
    if (dados.nome && typeof dados.nome !== "string") {
      throw new Error("Nome do produto deve ser uma string.");
    }
    if (dados.preco !== undefined && (typeof dados.preco !== "number" || dados.preco <= 0)) {
      throw new Error("O preço deve ser um número maior que zero.");
    }
    if (dados.estoque !== undefined && (!Number.isInteger(dados.estoque) || dados.estoque < 0)) {
      throw new Error("Estoque deve ser um número inteiro não-negativo.");
    }
  }

  async inserir() {
    let client;
    try {
      await this.validar();
      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const result = await db.collection("produtos").insertOne({
        nome: this.nome,
        descricao: this.descricao,
        preco: this.preco,
        estoque: this.estoque,
        disponivel: this.disponivel,
        categoriaId: this.categoriaId
      });

      console.log("Produto inserido:", result.insertedId);
    } catch (error) {
      Logger.log("Erro ao inserir produto: " + error);
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

      const produtos = await db.collection("produtos").find(filtro).toArray();
      console.log("Produtos encontrados:", produtos);
    } catch (error) {
      Logger.log("Erro ao buscar produtos: " + error);
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

      const result = await db.collection("produtos").deleteMany(filtro);
      console.log("Produtos deletados:", result.deletedCount);
    } catch (error) {
      Logger.log("Erro ao deletar produtos: " + error);
    } finally {
      client?.close();
    }
  }

  static async atualizar(filtro, novosDados) {
    let client;
    try {
      Produto.validarAtualizacao(novosDados);

      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const result = await db.collection("produtos").updateMany(filtro, {
        $set: novosDados,
      });

      console.log("Produtos atualizados:", result.modifiedCount);
    } catch (error) {
      Logger.log(`Erro ao atualizar produtos com filtro ${JSON.stringify(filtro)}: ${error}`);
    } finally {
      client?.close();
    }
  }
}

module.exports = Produto;
