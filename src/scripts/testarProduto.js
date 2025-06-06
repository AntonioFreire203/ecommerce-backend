const Produto = require("../models/produto");
const { ObjectId } = require("mongodb");

// produto deve estar vinculado a uma categoria existente
// categoriaId deve ser um ObjectId válido de uma categoria existente no banco

async function testarProduto() {
  const categoriaId = new ObjectId("684024ce75835fec0121710c");

  console.log("Teste: preço inválido (zero)");
  let precoZero = new Produto("Produto A", "Teste", 0, 10, categoriaId);
  await precoZero.inserir();

  console.log("Teste: estoque negativo");
  let estoqueNegativo = new Produto("Produto B", "Teste", 100, -5, categoriaId);
  await estoqueNegativo.inserir();

  console.log("Teste: inserção válida");
  let valido = new Produto("Notebook X", "Alta performance", 2500, 5, categoriaId);
  await valido.inserir();

  console.log("Teste: produto sem estoque (disponível = false)");
  let semEstoque = new Produto("Cabo USB", "Apenas ilustrativo", 25, 0, categoriaId);
  await semEstoque.inserir();

  console.log("Produtos com estoque = 0:");
  await Produto.buscar({ estoque: 0 });

  // console.log("Removendo produtos de teste...");
  // await Produto.deletar({ nome: { $in: ["Notebook X", "Cabo USB", "Produto A", "Produto B"] } });
}

testarProduto();
