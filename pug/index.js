const express = require('express');
const Inventory = require('./Inventory');
const pug = require('pug');
const inventory = new Inventory();
const cors = require('cors');
const app = express();
const PORT = 3000;
const path = require('path');
const { urlencoded } = require('body-parser');

app.use(cors('*'));
// app.use(express.static(path.join(__dirname, 'views')));
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + '/public')));

app.set('views', path.join(__dirname, 'views', 'pug'));
app.set('view engine', 'pug');

// serverRoutes(app);

//PRODUCTOS DE EJEMPLO
inventory.addProduct(
  'avion',
  10000,
  'https://cdn3.iconfinder.com/data/icons/education-209/64/plane-paper-toy-science-school-128.png'
);
inventory.addProduct(
  'reloj',
  5000,
  'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png'
);

app.post('/productos', (req, res) => {
  const { title, price, thumbnail } = req.body;
  if (!title || !price || !thumbnail)
    return res.json({ error: 'faltan parametros' });
  const productoNuevo = inventory.addProduct(
    title,
    price,
    thumbnail
  );
  if (!productoNuevo)
    return res.json({ error: 'error al guardar producto' });
  res.redirect('/');
});

app.get('/productos', (req, res) => {
  const products = inventory.getProducts();
  res.render('productos', {
    products,
    productsExists: products.length > 0,
  });
});

const server = app.listen(PORT, () => {
  console.log(`Inicializado en el puerto ${PORT}`);
});

server.on('error', () => {
  console.log('error del servidor');
});
