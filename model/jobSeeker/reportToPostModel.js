const mongoose = require("mongoose");

const reportToPostSchema = mongoose.Schema({

        jobpostid : mongoose.Schema.Types.ObjectId,
        jobseekerid : mongoose.Schema.Types.ObjectId,
        messege : String

});

module.exports = reportToPostSchema;