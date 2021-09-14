const express = require('express');
const productsRepo = require('../repositories/products');
const productsTemplate = require('../view/products/index');

const router = express.Router();

router.get('/', async (req, res) => {
  const products = await productsRepo.getAll();
  //   products.forEach((product) => {
  //     console.log(product.title, product.price);
  //   });
  res.send(productsTemplate({ products }));
  //   res.send('Products');
});

module.exports = router;
