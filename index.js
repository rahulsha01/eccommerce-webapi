const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const connection = require('./config/mongoDB');
const app = express();
var cors = require('cors');
app.use(cors());
connection();
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.listen(process.env.PORT, () => {
    console.log('Server is up and running on port numner ' + process.env.PORT);
});