const feedbackModels = require("../model/feedbackModel");
const jobSeekerModel = require("../model/jobSeeker/jobSeekerModel");
const jobpostModels = require("../model/company/jobPostModel")
const createCompanyModel = require("../model/company/createCompany");
const applyonPostModel = require("../model/company/applicationOnPostModel")

exports.mainHome = (req, res) => {

    res.render("templates/home.ejs", {
        title:"Home"
    });
}

exports.login = (req, res) => {

    res.render("templates/login.ejs", {
        title:"login"
    });
}

exports.homelogin = async (req, res) => {

    const postData = await jobpostModels.find();
    const companyData = await createCompanyModel.find();
    const applyPostData = await applyonPostModel.find({jobseekerId:req.jobseekerId});

    if(req.jobseekerId){
        res.render("jobseeker/jobSeekerHome.ejs", {
            title:postData,
            companyData:companyData,
            applyPostData:applyPostData
        });
    }
    
    const applicationData = await applyonPostModel.find({companyId:req.companyId});
    const jobseekersData = await jobSeekerModel.find();
    if(req.companyId){
        res.render("company/jobApplication.ejs", {
            applications:applicationData,
            postData:postData,
            jobseekersData:jobseekersData
        });
    }

}

exports.contactus = (req, res) => {

    res.render("templates/contactUs.ejs",{
        title: "contactUS"
    });
}

exports.feedback = (req, res) => {

    res.render("templates/feedbackForm.ejs",{
        title: "feedback"
    });
}

exports.feedbackpost = async(req, res) => {

    var newfeedbackModel = new feedbackModels ({

        name : req.body.name,
        emailId : req.body.email,
        message : req.body.msg

    });

    await newfeedbackModel.save();

    res.redirect("/");

}

exports.topcompanies = async(req, res) => {

    const companyData =  await createCompanyModel.find();

    res.render("templates/topCompnies.ejs", {
        companyData:companyData,
    });

}