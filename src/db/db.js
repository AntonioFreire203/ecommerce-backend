const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbName = "ecommerce";

async function connect() {
  const client = new MongoClient(url);
  try {
    await client.connect();
    console.log("Conectado ao MongoDB com sucesso.");
    const db = client.db(dbName);
    return { db, client };
  } catch (error) {
    console.error(" Erro ao conectar ao MongoDB:", error);
    throw error; 
  }
}

module.exports = { connect };
