const jwt = require("jsonwebtoken")
const jobSeekerModel = require("../model/jobSeeker/jobSeekerModel")
const companyModel = require("../model/company/createCompany")

const authenticate = async (req,res,next) => {
    try {

        let token = 'hi';
        if(req.cookies.jobseekerjwtoken){
            token = await req.cookies.jobseekerjwtoken;
            
        }else{
            token = await req.cookies.companyjwtoken;
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const rootjobSeeker = await jobSeekerModel.findOne({_id:verifyToken._id, "tokens.token":token})     

        if(rootjobSeeker){ 
   
            res.cookie("jobseekerId", rootjobSeeker._id, {
                expires:new Date( Date.now() + 60*60*1000 ), // set jwt for 1 hour
                httpOnly:true
            });
            req.jobseekerId = rootjobSeeker._id
            next();
            
        }
        else {
            
            const rootCompany = await companyModel.findOne({_id:verifyToken._id, "tokens.token":token})      
            res.cookie("companyId", rootCompany._id, {
                expires:new Date( Date.now() + 60*60*1000 ), // set jwt for 1 hour
                httpOnly:true
            });
            req.companyId = rootCompany._id
            next();

            if(!rootCompany){
                throw new Error("unauthorized user")
            }

        }
        
    } catch (error) {
        res.status(403).send(error)
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

module.exports = authenticate