const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Payment = new Schema({
    payment_id: { type: String, required: true, max: 30 },
    order_id: { type: String, required: true, max: 40 },
    user_id: { type: String, required: true, max: 30 },
    amount: { type: Number, required: true, max: 30 },
    payment_method: { type: String, required: true, max: 30 },
    payment_status: { type: String, required: true, max: 30 },
    transaction_id: { type: String, required: true, max: 30 },
    payment_date: {  type: Date},
    createdAt: { type: Date },
    modifiedAt: { type: Date },
});

// Export the model
module.exports = mongoose.model("payment", Payment);
