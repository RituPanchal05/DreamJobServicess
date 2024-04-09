const jwt = require("jsonwebtoken")
const jobSeekerModel = require("../model/jobSeeker/jobSeekerModel")
const companyModel = require("../model/company/createCompany")

const checkLogin = async (req,res,next) => {

    try{
        var email = req.body.email;
        var password = req.body.password;
        
        if(!email && !password){
            res.render("templates/login", {error:"Please fill up details"})
        }
        else{

            const jobSeekerExist = await jobSeekerModel.findOne({email, password});
            
            const companyExist = await companyModel.findOne({email,password});
        
            if(jobSeekerExist) {   
                const token = await jobSeekerExist.genAuthToken()
                res.cookie("jobseekerjwtoken", token, {
                    expires:new Date( Date.now() + 60*60*1000 ), // set jwt for 1 hour
                    httpOnly:true
                })
                next()
            }
            else if(companyExist) {

                const token = await companyExist.genAuthToken()
                res.cookie("companyjwtoken", token, {
                    expires:new Date( Date.now() + 60*60*1000 ), // set jwt for 1 hour
                    httpOnly:true
                })
                next()
            }
            else{
                res.render("../views/templates/login", {

                    error:"Invalid Email or Password",
                });
            }

        }
    }
    catch(err){
        console.log("invalid");
    }
}


module.exports = checkLogin