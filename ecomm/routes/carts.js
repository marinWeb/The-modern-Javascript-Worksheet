const express = require('express');
const carts = require('../repositories/carts');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');

const showCartTemplate = require('../view/cart/show');

const router = express.Router();

router.post('/cart/products', async (req, res) => {
  let cart;
  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, { items: cart.items });

  res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
  if (!req.session.cartId) {
    res.send('Cart is empty');
  }
  // console.log(`cartId : ${req.session.cartId}`);
  const cart = await cartsRepo.getOne(req.session.cartId);

  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);
    // console.log(`product : ${JSON.stringify(product)}`);

    item.product = product;
  }

  // console.log(JSON.stringify(cart));
  res.send(showCartTemplate({ cart }));
  //   res.send('Cart will appear here!!!');
});

router.post('/cart/products/delete', async (req, res) => {
  // res.send('attempting to delete product with id : ' + req.body.itemId);
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);

  const updatedCartItems = cart.items.filter((item) => item.id !== itemId);

  await cartsRepo.update(req.session.cartId, { items: updatedCartItems });

  res.redirect('/cart');
});
module.exports = router;
