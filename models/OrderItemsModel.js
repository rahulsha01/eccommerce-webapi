const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let OrderItem = new Schema({
    order_item_id: { type: String, required: true, max: 30 },
    order_id: { type: String, required: true, max: 40 },
    product_id: { type: String, required: true, max: 30 },
    quantity: { type: Number, required: true, max: 100 },
    price: { type: Number, required: true, max: 100 },
    createdAt: { type: Date },
    modifiedAt: { type: Date },
});

// Export the model
module.exports = mongoose.model("orderItem", OrderItem);
