const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CartItem = new Schema({
    cart_item_id: { type: String, required: true, max: 36 },
    cart_id: { type: String, required: true, max: 30 },
    product_id: { type: String, required: true, max: 30 },
    quantity: { type: Number, required: true, max: 30 },
    createdAt: { type: Date },
    modifiedAt: { type: Date }
});

// Export the model
module.exports = mongoose.model("cartItem", CartItem);
