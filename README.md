# EcooByte

Este projeto implementa o backend de um sistema de e-commercee. O foco está no armazenamento, validação e busca de dados de usuários, produtos, categorias e pedidos, utilizando Node.js e MongoDB  .


## Visão Geral

      1-CRUD completo para Usuários, Produtos, Categorias e Pedidos

      2-Validações de regras de negócio no lado do servidor

     3-Conexão direta com MongoDB via driver oficial

     4-Logs de erros registrados em logs/log.txt

     5-Scripts de teste para simular operações e validar comportamentos
## Estrutura do Projeto
```
ecommerce-backend/
├── src/
│   ├── db/
│   │   └── db.js
│   ├── models/
│   │   ├── usuario.js
│   │   ├── produto.js
│   │   ├── categoria.js
│   │   └── pedido.js
│   ├── scripts/
│   │   ├── testarUsuario.js
│   │   ├── testarProduto.js
│   │   ├── testarCategoria.js
│   │   ├── testarPedido.js
│   │   ├── listarUsuarios.js
│   │   ├── listarProdutos.js
│   │   └── listarCategorias.js
│   └── utils/
│       └── logger.js
├── logs/
│   └── log.txt          # Arquivo de log de erros
├── package.json
├── .gitignore
└── README.md


```

## Casos de Uso Implementados

### Usuário
- ✅ Validação de e-mail com regex
- ✅ Impede e-mails duplicados
- ✅ Gera dataCadastro automaticamente
- ✅ Validação de senha (mínimo 6 caracteres)

### Produto
- ✅ Impede estoque negativo
- ✅ Preço deve ser maior que zero
- ✅ Marcação como indisponível se estoque = 0
- ✅ Associação a uma categoria

### Pedido
- ✅ Valida existência de usuário e produtos
- ✅ Impede pedido sem itens
- ✅ Calcula valorTotal automaticamente
- ✅ Reduz estoque dos produtos comprados

### Categoria
- ✅ Impede nomes duplicados

## Scripts de Teste

Scripts localizados em `src/scripts/`:

- **testarUsuario.js**: validações de email, senha, duplicação
- **testarProduto.js**: estoque, preço, inserção válida  
- **testarCategoria.js**: nome inválido, duplicação, atualização
- **testarPedido.js**: pedidos com múltiplos produtos, controle de estoque

Scripts utilitários (em `src/utils/`):

- **listarUsuarios.js**
- **listarProdutos.js** 
- **listarCategorias.js**

```bash
# Testar criação de usuário com e-mail inválido
node src/scripts/testarUsuario.js

# Testar inserção e regras de negócio de produtos
node src/scripts/testarProduto.js

# Testar pedidos com redução de estoque
node src/scripts/testarPedido.js

# Testar categorias e validações
node src/scripts/testarCategoria.js

# Listar dados cadastrados
node src/utils/listarUsuarios.js
node src/utils/listarProdutos.js
node src/utils/listarCategorias.js
```

## 📄 Logs

Os erros e exceções são registrados automaticamente em `logs/log.txt`.
Esse arquivo serve como evidência do tratamento de exceções exigido no projeto.
