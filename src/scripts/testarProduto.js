const Produto = require("../models/produto");
const { connect } = require("../db/db");

async function testarProduto() {
  const { db, client } = await connect();
  try {
    const categoria = await db.collection("categorias").findOne({ nome: "Informática" });
    if (!categoria) throw new Error("Categoria não encontrada. Rode o seed.js.");

    console.log("Teste: preço inválido (zero)");
    await new Produto("Produto A", "Teste", 0, 10, categoria._id).inserir();

    console.log("Teste: estoque negativo");
    await new Produto("Produto B", "Teste", 100, -5, categoria._id).inserir();

    console.log("Teste: inserção válida");
    await new Produto("Notebook X", "Alta performance", 2500, 5, categoria._id).inserir();

    console.log("Teste: produto sem estoque");
    await new Produto("Cabo USB", "Apenas ilustrativo", 25, 0, categoria._id).inserir();

    console.log("Produtos com estoque = 0:");
    await Produto.buscar({ estoque: 0 });

  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}
testarProduto();
