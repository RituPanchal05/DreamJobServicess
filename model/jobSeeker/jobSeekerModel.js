const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//we can use [] brackets instead of array, if array doesn't give output

const jobSeekerSchema = new mongoose.Schema({

        address : {
            resident : String,
            area : String,
            city : String,
            zipCode : Number
        },
        age : Number,
        dob : String,
        dpImg : {
            avatar: String,
            cloudinary_id: String
        },
        educationInfo : { // need to be update
            qualification : String,
            college : String,
            university : String,
            passoutYear : Number,
            Skills : String,
            description : String,
            certificates : String,
        },
        technologies: {
            type: Array
        },
        email : {
            type : String,
            required : true
        },
        jobType : String,
        mobileNo : String,
        name : {
            type : String,
            required : true
        },
        password : {
            type : String,
            required : true 
        },
        regiDate : {
            type : String
        },
        resume : String,
        workBackgroundInfo : {
            compname : String,
            position : String,
            workedtechnologies : String,
            workexperienceyear : Number,
            workdescription : String,
            sdate  : String,
            edate  : String
        },
        followedCompany : Array,
        tokens: [
            {
                token:{
                    type:String,
                    required:true
                }
            }
        ]
            
});

jobSeekerSchema.methods.genAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save()
        return token

    }catch(err){
        console.log(err)
    }
}

const jobseekermodels = mongoose.model('jobseekermodels',jobSeekerSchema);
module.exports = jobseekermodels