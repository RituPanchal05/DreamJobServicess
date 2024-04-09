const createComapnyModel = require("../../model/company/createCompany");
const jobSeekerModel = require("../../model/jobSeeker/jobSeekerModel")
const jobpostModels = require("../../model/company/jobPostModel")
const applicationonPost = require("../../model/company/applicationOnPostModel");
const applyonPostModel = require("../../model/company/applicationOnPostModel");
const upload = require("../../utils/multer")
const cloudinary = require("../../utils/cloudinary");

exports.profile = async (req, res) => {

    const _id = req.cookies.companyId;
    
    const data = await createComapnyModel.findById(_id);

    res.render("company/profile.ejs", {
        title:data
    });
}

exports.signUp = (req, res) => {

    res.render("company/signUp.ejs", {
        title:"signUp"
    });
}

exports.login = (req, res) => {

    res.render("company/login.ejs", {
        title:"login"
    });
}

exports.companyHome = (req, res) => {

    res.render("company/companyHome.ejs", {
        title:"Home"
    });
}

exports.jobApplication = async (req, res) => {

    const postData = await jobpostModels.find();
    const applicationData = await applyonPostModel.find({companyId:req.cookies.companyId});
    const jobseekersData = await jobSeekerModel.find();

    res.render("company/jobApplication.ejs",{
        applications:applicationData,
        postData:postData,
        jobseekersData:jobseekersData
    });
}

exports.createPost = async (req,res) => {

    res.render("company/createPost.ejs");

}

//post createPost page
exports.post = async(req, res) => {

    
    const _id = req.cookies.companyId;

        const techName = req.body.tech;

        let data = await jobpostModels.findById(_id)

        if(techName){
            data.techName = techName
            console.log(data.techName);
        }

        data = await jobpostModels.findByIdAndUpdate(
            {_id}, 
            {
                technologies: data.techName,
            }
        );

        await res.render('company/profile.ejs', {
            title:data
        })

}


exports.success = (req, res) => {

    res.render("company/success.ejs", {
        title:"success"
    });
}

//post createpost
exports.post =  async (req, res) => {

    try{

        const postTitle = req.body.postTitle;
        const description = req.body.description;
        const startDate = req.body.s_date;
        const endDate = req.body.e_date;
        const vaccancy = req.body.vaccancies;
        const jobType = req.body.job_type;
        const experience  = req.body.experience;
        const _id = req.cookies.companyId;
        const techName = req.body.tech;
        const jobtype = req.body.jobtype;

        var newjobpostModels = new jobpostModels ({
            postTitle,
            description, 
            startDate, 
            endDate,
            vaccancy,
            jobType,
            experience,
            technologies: techName,
            companyId: _id, jobType : jobtype
        });

        await newjobpostModels.save();

        res.render('company/createPost.ejs');
    }
    catch(err){
        console.log(err);  
    }

}

exports.createCompany = async (req, res) => {

    try{

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password; 

        if(!name || !email || !password){
            res.render("../views/company/signUp", {

                error:"Please fillup details",
                title:"Sign up"
            });
        }

        const isJobSeekerExist = await jobSeekerModel.findOne({email});
        const isCompanyExist = await createComapnyModel.findOne({email});

        if(isJobSeekerExist || isCompanyExist){
            res.render("../views/company/signUp", {

                error:"Email already exist",
                title:"Sign up"
            });
        }
        else{
            var newcompanyModel = new createComapnyModel ({ name, email, password });

            await newcompanyModel.save();
            res.render("../views/company/signUp", {

                success:"you signed up successfully. Please",
                title:"Sign up"
            });

            // setTimeout(()=> res.redirect("../login"), 5000);
        }

    }
    catch(err){
        console.log(err);  
    }
}

exports.myPost = async (req, res) => {

    const _id = req.cookies.companyId;

    var jobpostData = await jobpostModels.find({companyId:_id})
    var applyonPostData = await applyonPostModel.find({companyId:_id})
    var jobseekerData = await jobSeekerModel.find();

    res.render("company/myPost.ejs", {
        jobpostData: jobpostData,
        applyonPostData: applyonPostData,
        jobseekerData: jobseekerData
    });
}

exports.postProfile = async (req, res) => {

    const _id = req.cookies.companyId;

    // if info is postedd

    if(req.body.typeOfInput == "info") {

        const companyName = req.body.companyName;
        const description = req.body.description;

        upload.single('image')
        let data = await createComapnyModel.findById(_id);
        var result = {};
        if(req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        else if(data.dpImg) {
            result.secure_url = data.dpImg.avatar
            result.public_id = data.dpImg.cloudinary_id
        }
        
        if(companyName){
            data.companyName = companyName
        }
        if(description){
            data.companyDescription = description[1]
        }

        data = await createComapnyModel.findByIdAndUpdate(
            {_id}, 
            {
                companyName: data.companyName,
                companyDescription: data.companyDescription,
                dpImg:{
                    avatar: result.secure_url,
                    cloudinary_id: result.public_id
                }
            }
        );

        await res.render('company/profile.ejs', {
            title:data
        })

    }

    // if password is posted

    else if(req.body.typeOfInput == "moreaboutmycompany") {
            
            const owner = req.body.owner;
            const contact = req.body.contact;
            const emp = req.body.employee;
            const websiteurl = req.body.websiteurl;
            const socialmediaurl = req.body.socialmediaurl;
            const establishedyear = req.body.establishedyear;
            const regiDate = req.body.regiDate;
            const workplace = req.body.workplace;
            const area = req.body.area;
            const city = req.body.city;
            const zip = req.body.zip;
    
            let data = await createComapnyModel.findById(_id)
    
            if(owner){
                data.name = owner
            }
            if(contact){
                data.contactNo = contact
            }
            if(emp){
                data.empStaff = emp
            }
            if(websiteurl){
                data.websiteUrl = websiteurl
            }
            if(socialmediaurl){
                data.socialMediaUrl = socialmediaurl
            }
            if(establishedyear){
                data.establishedYear = establishedyear
            }
            if(regiDate){
                data.regiDate = regiDate
            }
            if(workplace){
                data.address.workPlace = workplace
            }
            if(area){
                data.address.area = area
            }
            if(city){
                data.address.city = city
            }
            if(zip){
                data.address.zipCode = zip
            }            
    
            data = await createComapnyModel.findByIdAndUpdate(
                {_id}, 
                {
                    name: data.name,
                    contactNo: data.contactNo,
                    empStaff: data.empStaff,
                    websiteUrl: data.websiteUrl,
                    socialMediaUrl: data.socialMediaUrl,
                    establishedYear: data.establishedYear,
                    regiDate: data.regiDate,
                    address: {
                        workPlace: data.address.workPlace,
                        area: data.address.area,
                        city: data.address.city,
                        zipCode: data.address.zipCode
                    }                    
                }
            );
    
            await res.render('company/profile.ejs', {
                title:data
            })
    }

    else if(req.body.typeOfInput == 'tech'){

        console.log("activated");

        const techName = req.body.tech;

        let data = await createComapnyModel.findById(_id)

        if(techName){
            data.techName = techName
            console.log(data.techName);
        }

        data = await createComapnyModel.findByIdAndUpdate(
            {_id}, 
            {
                technologies: data.techName,
            }
        );

        await res.render('company/profile.ejs', {
            title:data
        })

    }

}

exports.applications = async (req, res) => {

    const jobseekerId = req.body.jobseekerId;
    const postId = req.body.postId;
    const companyId = req.cookies.companyId;
    var status="";

    if(req.body.select){
        status = req.body.select;
    }
    else{
        status = req.body.reject;
    }
    console.log(postId);
    console.log(companyId);
    console.log(status);
    const data = await applicationonPost.findOne({jobseekerId, postId, companyId});

    await applicationonPost.findByIdAndUpdate({_id:data._id}, {
        jobseekerId: data.jobseekerId,
        postId: data.postId,
        companyId: data.companyId,
        decision:status
    })

    const postData = await jobpostModels.find();
    const applicationData = await applicationonPost.find({companyId:req.cookies.companyId});
    const jobseekersData = await jobSeekerModel.find();
    res.render("company/jobApplication.ejs", {
        applications:applicationData,
        postData:postData,
        jobseekersData:jobseekersData
    });

}

exports.logout = async (req, res) => {
    res.clearCookie("companyjwtoken",{path:"/"})
    res.clearCookie("companyId",{path:"/"})
    res.redirect("/home");
}