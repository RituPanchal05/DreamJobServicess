const mongoose = require("mongoose");

const contactSiteSchema = mongoose.Schema({
        jobseekerid : mongoose.Schema.Types.ObjectId,
        messege : String
});

module.exports = contactSiteSchema;