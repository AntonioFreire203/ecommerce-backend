# E-commerce Backend

Este projeto implementa o backend de um sistema de e-commercee. O foco está no armazenamento, validação e busca de dados de usuários, produtos, categorias e pedidos, utilizando Node.js e MongoDB sem o uso de frameworks .


## Visão Geral

    CRUD completo para Usuários, Produtos, Categorias e Pedidos

    Validações de regras de negócio no lado do servidor

    Conexão direta com MongoDB via driver oficial

    Logs de erros registrados em logs/log.txt

    Scripts de teste para simular operações e validar comportamentos
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
