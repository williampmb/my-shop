const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

class Product {
  constructor(t, p, d, i, id, uId) {
    this.title = t;
    this.price = p;
    this.description = d;
    this.image_url = i;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = uId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteByid(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) });
  }
}

module.exports = Product;
