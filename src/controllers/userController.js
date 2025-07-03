
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

exports.createUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuario = new Usuario(nome, email, senha);
    const insertedId = await usuario.inserir();
    res.status(201).send({ id: insertedId, nome, email });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.validarSenha(email, senha);

        const token = jwt.sign({ id: usuario._id, nome: usuario.nome }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).send({ usuario, token });
    } catch (error) {
        res.status(401).send({ error: error.message });
    }
};

exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.buscar();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.buscar({ _id: req.params.id });
    if (!usuario) {
      return res.status(404).send();
    }
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateUsuario = async (req, res) => {
  try {
    await Usuario.atualizar({ _id: req.params.id }, req.body);
    res.status(200).send({ message: 'Usuario atualizado com sucesso' });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  try {
    await Usuario.deletar({ _id: req.params.id });
    res.status(200).send({ message: 'Usuario deletado com sucesso' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
