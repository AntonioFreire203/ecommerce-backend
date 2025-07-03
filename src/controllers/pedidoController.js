
const Pedido = require('../models/pedido');

exports.createPedido = async (req, res) => {
  try {
    const { usuarioId, itens } = req.body;
    const pedido = new Pedido(usuarioId, itens);
    await pedido.inserir();
    res.status(201).send(pedido);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.buscar();
    res.status(200).send(pedidos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.buscar({ _id: req.params.id });
    if (!pedido) {
      return res.status(404).send();
    }
    res.status(200).send(pedido);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updatePedido = async (req, res) => {
  try {
    await Pedido.atualizar({ _id: req.params.id }, req.body);
    res.status(200).send({ message: 'Pedido atualizado com sucesso' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deletePedido = async (req, res) => {
  try {
    await Pedido.deletar({ _id: req.params.id });
    res.status(200).send({ message: 'Pedido deletado com sucesso' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
