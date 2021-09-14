const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const scrypto = util.promisify(crypto.scrypt);
const Repository = require('./repository');

class UsersRepository extends Repository {
  async create(attrs) {
    if (attrs) {
      attrs.id = this.getRandomId();
      const records = await this.getAll();

      const salt = crypto.randomBytes(8).toString('hex');
      const buff = await scrypto(attrs.password, salt, 64);

      const record = {
        ...attrs,
        password: `${buff.toString('hex')}.${salt}`,
      };
      records.push(record);

      await this.writeAll(records);

      return record;
    }
  }

  async comparePassword(saved, supplied) {
    const [hashed, salt] = saved.split('.');

    const buff = await scrypto(supplied, salt, 64);
    const hashSupplied = buff.toString('hex');
    console.log(supplied);
    console.log(`hash : ${hashed}  hashSupplied : ${hashSupplied}`);
    console.log(hashed === hashSupplied);
    return hashed === hashSupplied;
  }
}

// const test = () => {
//   const userRepo = new UsersRepository('users.json');

//   userRepo.create({ email: 'test2333@test.com' });
// };
module.exports = new UsersRepository('users.json');
