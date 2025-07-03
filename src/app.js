const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const categoriaRoutes = require('./routes/categoriaRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: false, 
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/view');

const session = require('express-session');

app.use(session({
    secret: 'your_secret_key',
    name: 'ecobyteLogin',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const { isAuthenticated } = require('./middleware/authMiddleware');

app.use('/categorias', isAuthenticated, categoriaRoutes);
app.use('/pedidos', isAuthenticated, pedidoRoutes);
app.use('/produtos', isAuthenticated, produtoRoutes);
app.use('/usuarios', usuarioRoutes);

const userController = require('./controllers/userController');

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

app.get('/home', isAuthenticated, (req, res) => {
  res.render('home', { userName: req.session.userName });
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/home');
    }
    res.clearCookie('ecobyteLogin'); 
    res.redirect('/login');
  });
});

app.get('/', (req, res) => {
  if (req.session && req.session.userId) {
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});

require('./scripts/seed');

app.listen(port, () => {
  console.log(`O Servidor está rodando na http://localhost:${port}`);
});