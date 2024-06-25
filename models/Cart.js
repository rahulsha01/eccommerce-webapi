const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Cart = new Schema({
    cart_id: { type: String, required: true, max: 36 },
    user_id: { type: String, required: true, max: 30 },
    createdAt: { type: Date },
    modifiedAt: { type: Date }
});

// Export the model
module.exports = mongoose.model("cart", Cart);
