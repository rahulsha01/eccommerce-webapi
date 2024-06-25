const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ProductReview = new Schema({
    review_id: { type: String, required: true, max: 30 },
    product_id: { type: String, required: true, max: 40 },
    user_id: { type: String, required: true, max: 300 },
    rating: { type: Number, required: true, max: 100 },
    comment: { type: String, required: true, max: 100 },
    createdAt: { type: Date },
    modifiedAt: { type: Date },
});

// Export the model
module.exports = mongoose.model("productReview", ProductReview);
