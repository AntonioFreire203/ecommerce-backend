
const Produto = require('../models/produto');

exports.createProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, categoriaId } = req.body;
    const produto = new Produto(nome, descricao, preco, estoque, categoriaId);
    await produto.inserir();
    res.status(201).send(produto);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.buscar();
    res.status(200).send(produtos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getProdutoById = async (req, res) => {
  try {
    const produto = await Produto.buscar({ _id: req.params.id });
    if (!produto) {
      return res.status(404).send();
    }
    res.status(200).send(produto);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateProduto = async (req, res) => {
  try {
    await Produto.atualizar({ _id: req.params.id }, req.body);
    res.status(200).send({ message: 'Produto atualizado com sucesso' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deleteProduto = async (req, res) => {
  try {
    await Produto.deletar({ _id: req.params.id });
    res.status(200).send({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
