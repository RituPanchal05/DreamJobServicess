const mongoose = require("mongoose");

const jobpostSchema = new mongoose.Schema({
    technologies : Array,
    vaccancy : Number,
    description : String,
    companyId : mongoose.Schema.Types.ObjectId,
    endDate : {
        type : Date
    },
    jobType : {
        type: String
    },
    postTitle : String,
    startDate : {
        type : Date
    },
    experience : {
        type : Number
    }
});

const jobpostModels = mongoose.model('jobpostmodels',jobpostSchema);
module.exports = jobpostModels;