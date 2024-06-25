const {Schema } = require('../utility/constant')

let Product = new Schema({
  productName: { type: String, required: true, max: 30 },
  product_id: { type: String, required: true, max: 40 },
  productDescription: { type: String, required: true, max: 300 },
  procutPrice: { type: Number, required: true, max: 100  },
  productStockQuantity: { type: String, required: true, max: 100 },
  category_id: { type: String, required: true, max: 100 },
  productImagesUrl: { type: IMG, required: true, max: 100 },
  productCreatedAt: { type: Date },
  procutModifiedAt: { type: Date },
});

const IMG = {
    url: { type: String, required: true, max: 300 },
    size: { type: String, required: true, max: 300 }
}

// Export the model
module.exports = mongoose.model("Products", Product);
