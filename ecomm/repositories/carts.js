const Repository = require('./repository');

class Carts extends Repository {}

module.exports = new Carts('carts.json');
