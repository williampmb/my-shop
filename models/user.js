const mongodb = require("mongodb");
const getDb = require("../utils/database").getDb;

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    console.log("ADD TO CART");
    //const cartProuct = this.cart.items.findIndex((p) => p._id === product._id);

    const updatedCart = {
      items: [{ productId: new mongodb.ObjectID(product._id), quantity: 1 }],
    };
    const db = getDb();
    db.collection("users").updateOne(
      { _id: new mongodb.ObjectID(this._id) },
      { $set: { cart: updatedCart } }
    );
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .find({ _id: new mongodb.ObjectId(id) })
      .next();
  }
}

module.exports = User;
