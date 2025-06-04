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
    const categoria = await db.collection("categorias").findOne({ _id: this.categoriaId });

    if (!categoria) {
      client.close();
      throw new Error("Categoria informada não existe.");
    }

    client.close();
  }

  async inserir() {
    try {
      await this.validar();

      const { db, client } = await connect();

      const result = await db.collection("produtos").insertOne({
        nome: this.nome,
        descricao: this.descricao,
        preco: this.preco,
        estoque: this.estoque,
        disponivel: this.disponivel,
        categoriaId: this.categoriaId
      });

      console.log("Produto inserido:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir produto: " + error);
    }
  }


  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const produtos = await db.collection("produtos").find(filtro).toArray();
      console.log("Produtos encontrados:", produtos);
      client.close();
    } catch (error) {
      Logger.log("Erro ao buscar produtos: " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("produtos").deleteMany(filtro);
      console.log("Produtos deletados:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar produtos: " + error);
    }
  }
}

module.exports = Produto;
