const Usuario = require("../models/usuario");

async function testarUsuario() {
//teste de usuario com e-mail inválido
  console.log("Teste: usuário com e-mail inválido");
  let invalido = new Usuario("Invalido", "sem-arroba", "123456");
  await invalido.inserir();

  // teste de usuário com senha muito curta
  console.log("Teste: senha muito curta");
  let curta = new Usuario("Senha Curta", "curta@example.com", "123");
  await curta.inserir();

  // teste de inserção válida
  console.log("Teste: inserção válida");
  let valido = new Usuario("Antonio Teste", "antonio@example.com", "senha2020");
  await valido.inserir();

 // testar a duplicação de e-mail
let usariovalido = new Usuario("Maria Original", "maria@example.com", "senha2345");
await usariovalido.inserir();

  console.log("Teste: duplicação de e-mail");
  let duplicado = new Usuario("Maria Clone", "maria@example.com", "senha456");
  await duplicado.inserir();

  // buscar usuários com e-mail específico
  console.log("Usuários com e-mail 'antonio@example.com':");
  await Usuario.buscar({ email: "antonio@example.com" });

 //deletar o usuário de teste maria
  console.log("Limpando usuários de teste");
  await Usuario.deletar({ email: "maria@example.com" });
}

testarUsuario();
