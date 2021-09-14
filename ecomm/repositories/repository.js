const fs = require('fs');

const crypto = require('crypto');

module.exports = class Repository {
  constructor(fileName) {
    if (!fileName) {
      throw new Error('File Name needs to be provided');
    }
    this.fileName = fileName;

    try {
      fs.accessSync(fileName);
    } catch {
      fs.writeFileSync(this.fileName, '[]');
    }
  }

  async create(attrs) {
    attrs.id = this.getRandomId();
    console.log('in create method');
    console.log(this.fileName);
    const records = await this.getAll();
    // console.log(attrs);
    // console.log(this.fileName);
    // console.log(records);
    records.push(attrs);
    this.writeAll(records);
    console.log('after pushing');
    return attrs;
  }

  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.fileName));
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.fileName,
      JSON.stringify(records, null, 2)
    );
  }

  async getOne(id) {
    const records = await this.getAll();

    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attr) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    Object.assign(record, attr);
    await this.writeAll(records);
  }

  async getOneBy(filter) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filter) {
        if (record[key] !== filter[key]) {
          found = false;
        }
      }

      if (found) return record;
    }
  }

  getRandomId() {
    return crypto.randomBytes(4).toString('hex');
  }
};
