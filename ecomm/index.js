const express = require('express');

const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const UserRepo = require('./repositories/users');

const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    keys: ['adajjdjsj232j'],
  })
);

app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);

app.listen(3000, () => {
  console.log('Listening');
  // console.log(app);
});
