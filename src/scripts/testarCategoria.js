const Categoria = require("../models/categoria");

async function testarCategoria() {
  console.log("Teste: inserção válida");
  let cat1 = new Categoria("Informática", "Produtos relacionados a computadores e periféricos");
  await cat1.inserir();

  console.log("Teste: inserção duplicada");
  let catDuplicada = new Categoria("Informática", "Descrição alternativa");
  await catDuplicada.inserir();

  console.log("Teste: buscar categorias");
  await Categoria.buscar();

//   console.log("Teste: excluir categorias de teste");
//   await Categoria.deletar({ nome: "Informática" });
}

testarCategoria();
