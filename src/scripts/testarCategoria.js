const Categoria = require("../models/categoria");

async function testarCategoria() {
  // Teste: Inserção válida
  console.log("Teste: inserção válida");
  const cat1 = new Categoria("Informática", "Produtos relacionados a computadores e periféricos");
  await cat1.inserir();

  // Teste: Nome inválido (vazio)
  console.log("Teste: nome inválido (vazio)");
  const catInvalida = new Categoria("", "Sem nome válido");
  await catInvalida.inserir();

  // Teste: Inserção duplicada
  console.log("Teste: inserção duplicada");
  const catDuplicada = new Categoria("Informática", "Descrição alternativa");
  await catDuplicada.inserir();

  // Buscar categorias
  console.log("Teste: buscar categorias");
  await Categoria.buscar();

  // Inserção de categoria para exclusão
  const cat2 = new Categoria("Beleza", "Produtos de cuidados pessoais e cosméticos");
  await cat2.inserir();

  // Exclusão de categoria
  console.log("Teste: exclusão de categoria");
  await Categoria.deletar({ nome: "Beleza" });

  // Buscar após exclusão
  console.log("Teste: buscar categorias após exclusão");
  await Categoria.buscar();

  // Atualização
  console.log("Teste: atualizar categoria");
  await Categoria.atualizar(
    { nome: "Informática" },
    { descricao: "Tecnologia, computadores e acessórios" }
  );

  // Buscar após atualização
  console.log("Teste: buscar categorias após atualização");
  await Categoria.buscar();
}

testarCategoria();
