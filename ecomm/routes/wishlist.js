const express = require('express');

const WishlistRepo = require('../repositories/wishlist');
const productsRepo = require('../repositories/products');

const router = express.Router();

router.get('/wishlist', async (req, res) => {
  //   res.send('All the items wishlisted will be shown here!!!');

  if (!req.session.wishlistId) {
    res.send('Wishlist is empty!!!');
  }

  const wishlist = await WishlistRepo.getOne(req.session.wishlistId);
  let sendHtml = ``;
  let product;
  for (let itm of wishlist.wishlistArr) {
    //fetch the product from productsRepo based on id of itm.id
    product = await productsRepo.getOne(itm.id);

    itm.product = product;

    sendHtml += `<br/> ${itm.product.title}`;
  }

  res.send(sendHtml);
});

router.post('/wishlist', async (req, res) => {
  //Things to do here.

  //1. Fetch the wishlist based on req.session.wishlistId, if req.session.wishlistId is undefined, that means the user is wishlisting
  //the first time, in that case we would want to create a new entry and push it into wishlist.json, and the id obtained from that
  //needs to be mapped to req.session.wishlistId

  let wishlist, sendMessage;
  if (!req.session.wishlistId) {
    wishlist = await WishlistRepo.create({ wishlistArr: [] });
    req.session.wishlistId = wishlist.id;
  } else {
    wishlist = await WishlistRepo.getOne(req.session.wishlistId);
  }

  //2. If the user has already wishlisted this item, then we would want to remove this item from wishlist. So first lets check if
  // item already exists in the wishlistArr, if it does than we need to remove it from the wishlist.

  const existingWishListItm = wishlist.wishlistArr.find(
    (itm) => itm.id === req.body.productId
  );

  if (existingWishListItm) {
    wishlist.wishlistArr = wishlist.wishlistArr.filter(
      (itm) => itm.id !== req.body.productId
    );
    sendMessage = 'Product removed from wishlist';
  } else {
    wishlist.wishlistArr.push({ id: req.body.productId });
    sendMessage = 'Product added to wishlist';
  }

  //update the wishlist.json with the help of WishlistRepo instance
  await WishlistRepo.update(wishlist.id, { wishlistArr: wishlist.wishlistArr });

  res.send(sendMessage);
});

module.exports = router;
