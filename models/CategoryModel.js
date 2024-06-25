const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Category = new Schema({
     category_id  : { type: String, required: true, max: 36  },
     category_name : { type: String, required: true, max: 30  },
     category_desc : { type: String, required: true, max: 300 },
     created_at : { type: Date },
     updated_at : { type: Date }
});

// Export the model
module.exports = mongoose.model("categories", Category);
