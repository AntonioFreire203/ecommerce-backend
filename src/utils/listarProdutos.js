const Produto = require("../models/produto");
const { ObjectId } = require("mongodb");

async function testarProduto() {
  // Substitua pelo _id da categoria criada no banco
  //informatica: 68402230593cf4a1baf17d86
  const categoriaId = new ObjectId("684024ce75835fec0121710c");

  console.log("Teste: inserção válida com categoria");
  let p1 = new Produto("Teclado Gamer", "RGB mecânico", 199.99, 10, categoriaId);
  await p1.inserir();

  console.log("Teste: produto com categoria inexistente");
  let p2 = new Produto("Mouse Gamer", "Sem fio", 149.99, 5, new ObjectId());
  await p2.inserir();

  console.log("Produtos com esta categoria:");
  await Produto.buscar({ categoriaId });

  console.log("Remover produtos de teste");
  await Produto.deletar({ nome: { $in: ["Teclado Gamer", "Mouse Gamer"] } });
}

testarProduto();
