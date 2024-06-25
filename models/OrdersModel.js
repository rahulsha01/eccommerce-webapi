const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Order = new Schema({
    order_id: { type: String, required: true, max: 100 },
    user_id: { type: String, required: true, max: 50 },
    order_date: { type: Date },
    status: { type: String, required: true, max: 100 },
    total_amount: { type: Number, required: true, max: 100 },
    shipping_address: { type: String, required: true, max: 300 },
    billing_address: { type: String, required: true, max: 300 },
    createdAt: { type: Date },
    modifiedAt: { type: Date }
});

// Export the model
module.exports = mongoose.model("order", Order);