const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middleware');
const ProductsRepo = require('../../repositories/products');
const newProductTemplate = require('../../view/admin/products/newProduct');
const showProductsTemplate = require('../../view/admin/products/index');
const editProductTemplate = require('../../view/admin/products/editProduct');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products', requireAuth, async (req, res) => {
  const products = await ProductsRepo.getAll();

  res.send(showProductsTemplate({ products }));
  // res.send('Will show all products here!!!');
});

router.get('/admin/products/new', requireAuth, (req, res) => {
  console.log('about to render');
  res.send(newProductTemplate({}));
});

router.post(
  '/admin/products/new',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(newProductTemplate),
  async (req, res) => {
    console.log('in post method');

    const image = req.file.buffer.toString('base64');

    const { title, price } = req.body;

    await ProductsRepo.create({ title, price, image });

    res.redirect('/admin/products');
  }
);

router.get('/admin/products/:id/edit', async (req, res) => {
  console.log('in the edit route handler');
  console.log(req.params.id);

  const product = await ProductsRepo.getOne(req.params.id);
  console.log(product.title, product.price);

  if (!product) {
    console.log('no product found');
    res.send('Something went wrong!!!');
  }

  res.send(editProductTemplate({ product }));
});

router.post(
  '/admin/products/:id/edit',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(editProductTemplate, async (req) => {
    const product = await ProductsRepo.getOne(req.params.id);
    console.log(product.title, product.price);

    return { product };
  }),
  async (req, res) => {
    const changes = req.body;

    if (req.file) {
      changes.file = req.file.buffer.toString('base64');
    }

    try {
      await ProductsRepo.update(req.params.id, changes);
    } catch (Err) {
      console.log('Product does not exist');
    }

    res.redirect('/admin/products');
  }
);

router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
  await ProductsRepo.delete(req.params.id);

  res.redirect('/admin/products/');
});
module.exports = router;
