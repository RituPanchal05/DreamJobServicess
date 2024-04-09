const mongoose = require("mongoose");

const adminModel = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true 
    },
    premiumPackPrice : Number
});

module.exports = adminModel;