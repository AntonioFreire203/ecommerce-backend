
const Categoria = require('../models/categoria');

exports.createCategoria = async (req, res) => {
  try {
    const { nome, descricao } = req.body;
    const categoria = new Categoria(nome, descricao);
    await categoria.inserir();
    res.status(201).send(categoria);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.buscar();
    res.status(200).send(categorias);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.buscar({ _id: req.params.id });
    if (!categoria) {
      return res.status(404).send();
    }
    res.status(200).send(categoria);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateCategoria = async (req, res) => {
  try {
    await Categoria.atualizar({ _id: req.params.id }, req.body);
    res.status(200).send({ message: 'Categoria atualizada com sucesso' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deleteCategoria = async (req, res) => {
  try {
    await Categoria.deletar({ _id: req.params.id });
    res.status(200).send({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
