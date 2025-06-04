const Usuario = require("../models/usuario");

async function testarUsuario() {
//   console.log("Teste: usuário com e-mail inválido");
//   let invalido = new Usuario("Invalido", "sem-arroba", "123456");
//   await invalido.inserir();

//   console.log("Teste: senha muito curta");
//   let curta = new Usuario("Senha Curta", "curta@example.com", "123");
//   await curta.inserir();

  console.log("Teste: inserção válida");
  let valido = new Usuario("Antonio Teste", "antonio@example.com", "senha2020");
  await valido.inserir();

//   console.log("Teste: duplicação de e-mail");
//   let duplicado = new Usuario("Maria Clone", "maria@example.com", "senha456");
//   await duplicado.inserir();

  console.log("Usuários com e-mail 'antonio@example.com':");
  await Usuario.buscar({ email: "antonio@example.com" });

//   console.log("Limpando usuários de teste");
//   await Usuario.deletar({ email: "maria@example.com" });
}

testarUsuario();
