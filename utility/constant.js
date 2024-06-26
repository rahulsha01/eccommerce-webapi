const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const base64 = require('base64url')
const moment = require('moment')
const env = require('dotenv').config()
const MUUID = require('uuid-mongodb');
const router = require('express-promise-router')();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    bcrypt,
    jwt, 
    base64,
    moment,
    env,
    MUUID,
    router,
    Schema,
    mongoose
}