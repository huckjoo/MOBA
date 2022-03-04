const mongoose = require("mongoose");

const collectionsSchema = mongoose.Schema({
  token: String,
  products: [
    {
      product_name: String,
      price: Number,
      sale_price: Number,
      shop_name: String,
      shop_url: String,
      img: String,
      removedBgImg: String,
      likes: Number,
      category: String,
    },
  ],
});

module.exports = mongoose.model("collections", collectionsSchema);
