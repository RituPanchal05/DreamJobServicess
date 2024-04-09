const mongoose = require("mongoose");

const conn = () => { 
    
    try{
        mongoose.connect("mongodb://localhost:27017/DreamJobServices")
        console.log("connection successful");
    }
    catch (err){
        console.log(err);
    }
    
}

module.exports = conn
