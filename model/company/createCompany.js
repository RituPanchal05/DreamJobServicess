const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

const createCompanySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    address : {
        workPlace : String,
        area : String,
        city : String,
        zipCode : Number
    },
    dpImg : {
        avatar: String,
        cloudinary_id: String
    },
    establishedYear : {
        type : String
    },
    password : {
        type : String,
        required : true 
    },
    technologies : Array,
    companyDescription : String,
    companyName : {
        type : String, 
    },
    contactNo : Number,
    empStaff : Number,
    regiDate : {
        type : String
    },
    socialMediaUrl : String,
    websiteUrl : String,
    tokens: [
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
});


createCompanySchema.methods.genAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token

    }catch(err){
        console.log(err)
    }
}

const createCompanyModels = mongoose.model('companymodels', createCompanySchema);
module.exports = createCompanyModels