const mongoose = require("mongoose");

const premiumPackageSchema = new mongoose.Schema({

        jobpostId : { 
            type : mongoose.Schema.Types.ObjectId, //either use ObjectID = Schema.ObjectID near mongoose.Schema or ObjectId
        },
        price : Number,
        otherDetails: [
            {
                jobseekerId: mongoose.Schema.Types.ObjectId,
                paymentTime: String,
                paymentType : String,
                bankDetails : {
                    cardNumber : Number,
                    fullName : String,
                    date : String,
                    cvc : Number
                }
            }
            
        ]
        
});

const premiumPackmodels = mongoose.model('premiumPackmodels',premiumPackageSchema);
module.exports = premiumPackmodels