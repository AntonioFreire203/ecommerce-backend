const { connect } = require("../db/db");
const Logger = require("../utils/logger");

class Categoria {
  constructor(nome, descricao) {
    this.nome = nome;
    this.descricao = descricao || "";
  }

  validar() {
    if (!this.nome || typeof this.nome !== "string") {
      throw new Error("Nome da categoria é obrigatório.");
    }
  }

  async inserir() {
    try {
      this.validar();

      const { db, client } = await connect();

      const existente = await db.collection("categorias").findOne({ nome: this.nome });
      if (existente) {
        throw new Error("Já existe uma categoria com esse nome.");
      }

      const result = await db.collection("categorias").insertOne({
        nome: this.nome,
        descricao: this.descricao
      });

      console.log("Categoria inserida:", result.insertedId);
      client.close();
    } catch (error) {
      Logger.log("Erro ao inserir categoria: " + error);
    }
  }

  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const categorias = await db.collection("categorias").find(filtro).toArray();
      console.log("Categorias encontradas:", categorias);
      client.close();
    } catch (error) {
      Logger.log("Erro ao buscar categorias: " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("categorias").deleteMany(filtro);
      console.log("Categorias deletadas:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar categorias: " + error);
    }
  }

 static async atualizar(filtro, novosDados) {
  try {
    const { db, client } = await connect();
    const result = await db.collection("categorias").updateOne(filtro, { $set: novosDados });
    console.log("Categorias atualizadas:", result.modifiedCount);
    client.close();
  } catch (error) {
    Logger.log("Erro ao atualizar categoria: " + error);
  }
}



}


module.exports = Categoria;
