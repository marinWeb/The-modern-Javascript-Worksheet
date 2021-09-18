const Repository = require('./repository');

class Wishlist extends Repository {}

module.exports = new Wishlist('wishlist.json');
