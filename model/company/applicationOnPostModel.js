const mongoose = require("mongoose");

const applicationOnPostSchema = new mongoose.Schema({
    jobseekerId : mongoose.Schema.Types.ObjectId,
    postId : mongoose.Schema.Types.ObjectId,
    companyId : mongoose.Schema.Types.ObjectId,
    decision : String
});

const jobSpplyModel = mongoose.model('applicationOnPost', applicationOnPostSchema);
module.exports = jobSpplyModel;