const mongoose = require("mongoose");

module.exports = connection = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        };
        await mongoose.connect(process.env.MONGODB_URI, connectionParams);
        console.log("connected to Mongo DB.");
    } catch (error) {
        console.log(error, "could not connect database.");
    }
};