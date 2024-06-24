const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const connection = require('./config/mongoDB');
const app = express();
var cors = require('cors');
const user = require('./routes/user_routes');
const category = require('./routes/category_routes');
app.use(cors());
connection();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*
Routes Start
*/

app.use('/user', user);
app.use('/category', category);

/*
Route End
*/

app.listen(process.env.PORT, () => {
    console.log('Server is up and running on port numner ' + process.env.PORT);
});