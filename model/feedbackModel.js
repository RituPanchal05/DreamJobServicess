const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
        name: String,
        emailId : String,
        message : String
});

const feedbackmodels = mongoose.model('feedbackmodels', feedbackSchema);
module.exports = feedbackmodels