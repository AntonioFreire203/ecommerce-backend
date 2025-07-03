const { connect } = require("../db/db");
const Logger = require("../utils/logger");
const bcrypt = require('bcrypt');

class Usuario {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.dataCadastro = new Date();
  }

  static validarEmail(email) {
    const regex = /^[^@]+@[^@]+\.[^@]+$/;
    return regex.test(email);
  }

  static validarAtualizacao(dados) {
    if (dados.email && !Usuario.validarEmail(dados.email)) {
      throw new Error("E-mail inválido.");
    }
    if (dados.senha && dados.senha.length < 6) {
      throw new Error("A senha deve ter no mínimo 6 caracteres.");
    }
  }

  async inserir() {
    let client;
    try {
      if (!Usuario.validarEmail(this.email)) {
        throw new Error("E-mail inválido.");
      }

      if (!this.senha || this.senha.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres.");
      }

      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const existente = await db.collection("usuarios").findOne({ email: this.email });
      if (existente) {
        throw new Error("Já existe um usuário com esse e-mail.");
      }

      const hashedPassword = await bcrypt.hash(this.senha, 10);

      const result = await db.collection("usuarios").insertOne({
        nome: this.nome,
        email: this.email,
        senha: hashedPassword,
        dataCadastro: this.dataCadastro,
      });

      console.log("Usuário inserido:", result.insertedId);
      Logger.log(`Usuário ${this.nome} inserido com sucesso.`);
      return result.insertedId;
    } catch (error) {
      Logger.log("Erro ao inserir usuário: " + error);
      throw error;
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
      const usuarios = await db.collection("usuarios").find(filtro).toArray();
      return usuarios;
    } catch (error) {
      Logger.log("Erro ao buscar usuários: " + error);
      throw error;
    }
    finally {
      client?.close();
    }
  }

  static async validarSenha(email, senha) {
    let client;
    try {
      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const usuario = await db.collection("usuarios").findOne({ email });
      if (!usuario) {
        throw new Error("Authentication failed: User not found.");
      }

      const isMatch = await bcrypt.compare(senha, usuario.senha);
      if (!isMatch) {
        throw new Error("Authentication failed: Invalid password.");
      }

      delete usuario.senha;
      return usuario;

    } catch (error) {
        Logger.log("Erro na validação de senha: " + error);
        throw error;
    } finally {
        client?.close();
    }
  }

  static async atualizar(filtro, novosDados) {
    let client;
    try {
      Usuario.validarAtualizacao(novosDados);

      if (novosDados.senha) {
        novosDados.senha = await bcrypt.hash(novosDados.senha, 10);
      }

      const conn = await connect();
      const db = conn.db;
      client = conn.client;

      const result = await db.collection("usuarios").updateMany(filtro, {
        $set: novosDados,
      });

      console.log("Usuários atualizados:", result.modifiedCount);
    } catch (error) {
      Logger.log(`Erro ao atualizar usuários com filtro ${JSON.stringify(filtro)}: ${error}`);
      throw error;
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

      const result = await db.collection("usuarios").deleteMany(filtro);
      console.log("Usuários deletados:", result.deletedCount);
    } catch (error) {
      Logger.log("Erro ao deletar usuários: " + error);
      throw error;
    }
    finally {
      client?.close();
    }
  }
}

module.exports = Usuario;
