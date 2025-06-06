const Usuario = require("../models/usuario");

async function testarUsuario() {
  console.log("Teste: usuário com e-mail inválido");
  await new Usuario("Invalido", "sem-arroba", "123456").inserir();

  console.log("Teste: senha muito curta");
  await new Usuario("Senha Curta", "curta@example.com", "123").inserir();

  console.log("Teste: inserção válida");
  await new Usuario("Antonio Teste", "antonio@example.com", "senha2020").inserir();

  console.log("Teste: duplicação de e-mail");
  await new Usuario("Maria Original", "maria@example.com", "senha2345").inserir();
  await new Usuario("Maria Clone", "maria@example.com", "senha456").inserir();

  console.log("Usuários com e-mail 'antonio@example.com':");
  await Usuario.buscar({ email: "antonio@example.com" });

  console.log("Limpando usuários de teste");
  await Usuario.deletar({ email: "maria@example.com" });
}
testarUsuario();
