const { connect } = require("../db/db");
const Logger = require("../utils/logger");

class Usuario {
  constructor(nome, email,senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCadastro = new Date();
  }

  static validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

 async inserir() {
    try {
      if (!Usuario.validarEmail(this.email)) {
        throw new Error("E-mail inválido.");
      }

      if (!this.senha || this.senha.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres.");
      }

      const { db, client } = await connect();

      const existente = await db.collection("usuarios").findOne({ email: this.email });
      if (existente) {
        throw new Error("Já existe um usuário com esse e-mail.");
      }

      const result = await db.collection("usuarios").insertOne({
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        dataCadastro: this.dataCadastro,
      });

      console.log(" Usuário inserido:", result.insertedId);
      client.close();
      Logger.log(`Usuário ${this.nome} inserido com sucesso.`);
    } catch (error) {
      Logger.log("Erro ao inserir usuário: " + error);
    }
  }


  static async buscar(filtro = {}) {
    try {
      const { db, client } = await connect();
      const usuarios = await db.collection("usuarios").find(filtro).toArray();
      console.log(" Usuários encontrados:", usuarios);
      client.close();
    } catch (error) {
      Logger.log("Erro ao buscar usuários: " + error);
    }
  }

  static async atualizar(filtro, novosDados) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("usuarios").updateMany(filtro, {
        $set: novosDados,
      });
      console.log(" Usuários atualizados:", result.modifiedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao atualizar usuários: " + error);
    }
  }

  static async deletar(filtro) {
    try {
      const { db, client } = await connect();
      const result = await db.collection("usuarios").deleteMany(filtro);
      console.log(" Usuários deletados:", result.deletedCount);
      client.close();
    } catch (error) {
      Logger.log("Erro ao deletar usuários: " + error);
    }
  }
}

module.exports = Usuario;
