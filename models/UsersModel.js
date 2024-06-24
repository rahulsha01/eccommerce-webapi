const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema({
    userId : {type: String, id : true ,  index : true },
    firstName: {type: String, required: true, max: 100},
    lastName: {type: String, required: true, max: 100},
    email: {type: String, required: true, max: 30},
    password: {type: String, required: true, max: 10},
    phoneNumber : {type: String, required: true, max: 10},
    city: {type: String, required: true, max: 30},
    state: {type: String , required: true , max: 30},
    zipCode : {type: String, required: true, max: 6},
    country : {type: String, required: true, max: 20},
    role : {type : String , required : true},
    createdAt : {type: Date  },
    modifiedAt : {type: Date }
});

// Export the model
module.exports = mongoose.model('Users', Users); 