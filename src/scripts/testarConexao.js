const { connect } = require("../db/db");

async function testarConexao() {
  try {
    const { db, client } = await connect();
    console.log(" Teste concluído: conexão bem-sucedida com o banco", db.databaseName);
    client.close();
  } catch (error) {
    console.error(" Falha na conexão:", error);
  }
}

testarConexao();
