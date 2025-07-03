
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post('/', usuarioController.createUsuario);
router.post('/login', usuarioController.login);
router.get('/', isAuthenticated, usuarioController.getUsuarios);
router.get('/:id', isAuthenticated, usuarioController.getUsuarioById);
router.put('/:id', isAuthenticated, usuarioController.updateUsuario);
router.delete('/:id', isAuthenticated, usuarioController.deleteUsuario);

module.exports = router;
