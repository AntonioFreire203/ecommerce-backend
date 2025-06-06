const { connect } = require("../db/db");

async function seed() {
  const { db, client } = await connect();

  try {
    // Limpar coleções anteriores
    await db.collection("usuarios").deleteMany({});
    await db.collection("categorias").deleteMany({});
    await db.collection("produtos").deleteMany({});
    await db.collection("pedidos").deleteMany({});

    // Inserir usuário
    const usuario = {
      nome: "Antonio Teste",
      email: "antonio@example.com",
      senha: "senha2020",
      dataCadastro: new Date()
    };
    const usuarioResult = await db.collection("usuarios").insertOne(usuario);

    // Inserir categoria
    const categoria = {
      nome: "Informática",
      descricao: "Produtos de tecnologia"
    };
    const categoriaResult = await db.collection("categorias").insertOne(categoria);

    // Inserir produtos
    const produtos = [
      {
        nome: "Teclado Gamer",
        descricao: "RGB mecânico",
        preco: 199.99,
        estoque: 10,
        disponivel: true,
        categoriaId: categoriaResult.insertedId
      },
      {
        nome: "Cabo USB",
        descricao: "Apenas ilustrativo",
        preco: 25,
        estoque: 5,
        disponivel: true,
        categoriaId: categoriaResult.insertedId
      }
    ];

    await db.collection("produtos").insertMany(produtos);

    console.log(" Banco populado com sucesso");
  } catch (err) {
    console.error("Erro ao executar seed:", err);
  } finally {
    client.close();
  }
}

seed();
module.exports = seed;