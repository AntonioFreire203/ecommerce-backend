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

    // Inserir categorias
    const categorias = [
      {
        nome: "Informática",
        descricao: "Produtos de tecnologia"
      },
      {
        nome: "Eletrônicos",
        descricao: "Dispositivos eletrônicos em geral"
      },
      {
        nome: "Livros",
        descricao: "Livros de diversos gêneros"
      },
      {
        nome: "Casa e Decoração",
        descricao: "Itens para o lar e decoração"
      }
    ];
    const categoriaResult = await db.collection("categorias").insertMany(categorias);

    // Inserir produtos
    const produtos = [
      {
        nome: "Teclado Gamer",
        descricao: "RGB mecânico",
        preco: 199.99,
        estoque: 10,
        disponivel: true,
        categoriaId: categoriaResult.insertedIds[0] // Informática
      },
      {
        nome: "Cabo USB",
        descricao: "Apenas ilustrativo",
        preco: 25,
        estoque: 5,
        disponivel: true,
        categoriaId: categoriaResult.insertedIds[0] // Informática
      },
      {
        nome: "Smart TV 50 polegadas",
        descricao: "TV de alta resolução",
        preco: 2500.00,
        estoque: 3,
        disponivel: true,
        categoriaId: categoriaResult.insertedIds[1] // Eletrônicos
      },
      {
        nome: "O Senhor dos Anéis",
        descricao: "Trilogia completa",
        preco: 150.00,
        estoque: 20,
        disponivel: true,
        categoriaId: categoriaResult.insertedIds[2] // Livros
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