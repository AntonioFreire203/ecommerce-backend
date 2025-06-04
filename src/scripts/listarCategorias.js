const { connect } = require("../db/db");

async function listarCategorias() {
  const { db, client } = await connect();
  const categorias = await db.collection("categorias").find().toArray();

  console.log("Categorias:");
  categorias.forEach(c => {
    console.log(`Nome: ${c.nome}, ID: ${c._id}`);
  });

  client.close();
}

listarCategorias();
