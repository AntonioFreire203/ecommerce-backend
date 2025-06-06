const { connect } = require("../db/db");
const Logger = require("../utils/logger");

class Categoria {
  constructor(nome, descricao) {
    this.nome = nome;
    this.descricao = descricao || "";
  }

  validar() {
    if (!this.nome || typeof this.nome !== "string" || this.nome.trim() === "") {
      throw new Error("Nome da categoria é obrigatório.");
    }
  }

  static validarAtualizacao(dados) {
    if (dados.nome && (typeof dados.nome !== "string" || dados.nome.trim() === "")) {
      throw new Error("Nome da categoria deve ser uma string válida.");
    }
  }

  async inserir() {
    let client;
    try {
      this.validar();

      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const existente = await db.collection("categorias").findOne({ nome: this.nome });
      if (existente) {
        throw new Error("Já existe uma categoria com esse nome.");
      }

      const result = await db.collection("categorias").insertOne({
        nome: this.nome,
        descricao: this.descricao
      });

      console.log("Categoria inserida:", result.insertedId);
    } catch (error) {
      Logger.log("Erro ao inserir categoria: " + error);
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

      const categorias = await db.collection("categorias").find(filtro).toArray();
      console.log("Categorias encontradas:", categorias);
    } catch (error) {
      Logger.log("Erro ao buscar categorias: " + error);
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

      const result = await db.collection("categorias").deleteMany(filtro);
      console.log("Categorias deletadas:", result.deletedCount);
    } catch (error) {
      Logger.log("Erro ao deletar categorias: " + error);
    } finally {
      client?.close();
    }
  }

  static async atualizar(filtro, novosDados) {
    let client;
    try {
      Categoria.validarAtualizacao(novosDados);

      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const result = await db.collection("categorias").updateOne(filtro, { $set: novosDados });
      console.log("Categorias atualizadas:", result.modifiedCount);
    } catch (error) {
      Logger.log(`Erro ao atualizar categoria com filtro ${JSON.stringify(filtro)}: ${error}`);
    } finally {
      client?.close();
    }
  }
}

module.exports = Categoria;
