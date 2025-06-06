const { connect } = require("../db/db");

async function listarUsuarios() {
  const { db, client } = await connect();
  const usuarios = await db.collection("usuarios").find().toArray();

  console.log("Usuários:");
  usuarios.forEach(u => {
    console.log(`Nome: ${u.nome}, Email: ${u.email}, ID: ${u._id}`);
  });

  client.close();
}

listarUsuarios();
