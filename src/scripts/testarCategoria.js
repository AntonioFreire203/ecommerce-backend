const Categoria = require("../models/categoria");

async function testarCategoria() {
    // Teste de inserção de categoria
  console.log("Teste: inserção válida");
  let cat1 = new Categoria("Informática", "Produtos relacionados a computadores e periféricos");
  await cat1.inserir();
 // Teste de inserção com nome inválido (vazio)
  console.log("Teste: nome inválido (vazio)");
  console.log("Teste: inserção duplicada");
  let catDuplicada = new Categoria("Informática", "Descrição alternativa");
  await catDuplicada.inserir();
//
  console.log("Teste: buscar categorias");
  await Categoria.buscar();


 let cat2 = new Categoria("Beleza ", "Produtos de cuidados pessoais e cosméticos");
  await cat2.inserir(); 

//deletar categoria de teste
  console.log("Teste: exclusão de categoria");
  await Categoria.deletar({ nome: "Beleza " });

  console.log("Teste: buscar categorias após exclusão");
  await Categoria.buscar();

  // Atualizar categoria
  
  console.log("Teste: atualizar categoria");
    await Categoria.atualizar(
    { nome: "Informática" },
    { descricao: "Tecnologia, computadores e acessórios" }
    );
        console.log("Teste: buscar categorias após atualização");
        await Categoria.buscar();

}

testarCategoria();
