const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Product = new Schema({
  name: { type: String, required: true, max: 100 },
  product_id: { type: String, required: true, max: 100 },
  description: { type: String, required: true, max: 100 },
  price: { type: Number, required: true, max: 100 },
  stock_quantity: { type: String, required: true, max: 100 },
  category_id: { type: String, required: true, max: 100 },
  image_url: { type: String, required: true, max: 100 },
  created_at: { type: Date },
  updated_at: { type: Date },
});

// Export the model
module.exports = mongoose.model("Product", Product);
