const jobSeekerModel = require("../../model/jobSeeker/jobSeekerModel");
const createComapnyModel = require("../../model/company/createCompany");
const applicationOnPost = require("../../model/company/applicationOnPostModel");
const jobpostModels = require("../../model/company/jobPostModel");
const premiumPackModels = require("../../model/jobSeeker/premiumPackageModel");
const upload = require("../../utils/multer")
const cloudinary = require("../../utils/cloudinary");


exports.getProfile = async (req, res) => {

    const _id = req.cookies.jobseekerId;
    
    const data = await jobSeekerModel.findById(_id);

    await res.render("jobseeker/profile.ejs", {
        title:data
    });
}

exports.signUp = (req, res) => {

    res.render("jobseeker/signUp.ejs", {
        title:"signUp"
    });
}

exports.login = (req, res) => {

    res.render("jobseeker/login.ejs", {
        title:"login"
    });
}

exports.jobApplication = async (req, res) => {

    const jobseekerId = req.cookies.jobseekerId;
    const postData = await jobpostModels.find();
    const applyonPost = await applicationOnPost.find({jobseekerId});
    const companyData = await createComapnyModel.find();

    console.log(postData);
    res.render("jobseeker/jobApplication.ejs", {
        applyonPost:applyonPost,
        companyData:companyData,
        postData:postData
    });
}

exports.makeResume = async (req, res) => {

    const _id = req.cookies.jobseekerId;

    const data = await jobSeekerModel.findById(_id);
    console.log(data)
    res.render("jobseeker/resume.ejs", {
        title:data
    });
}

exports.companies = async(req, res) => {

    const companyData = await createComapnyModel.find();

    res.render("jobseeker/company.ejs", {
        companyData:companyData,
    });
}

exports.createjobSeeker = async (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password; 

    if(!name || !email || !password){
        res.render("../views/jobseeker/signUp", {

            error:"Please fillup details",
            title:"Sign up"
        });
    }

    const isJobSeekerExist = await jobSeekerModel.findOne({email});
    const isCompanyExist = await createComapnyModel.findOne({email});

    if(isJobSeekerExist || isCompanyExist){
        res.render("../views/jobseeker/signUp", {

            error:"Email already exist",
            title:"Sign up"
        });
    }
    else{
        var newjobSeekerModel = new jobSeekerModel ({ name, email, password });

        await newjobSeekerModel.save();

        res.render("../views/jobseeker/signUp", {

            success:"you signed up successfully. Please",
            title:"Sign up"
        });
    }
    
}

exports.postProfile = async (req, res) => {

    const _id = req.cookies.jobseekerId;

    // if info is posted

    if(req.body.typeOfInput == "info"){

        const name = req.body.name;
        const description = req.body.description;

        upload.single('image')
        let data = await jobSeekerModel.findById(_id)

        if(req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        else if(data.dpImg) {
            result.secure_url = data.dpImg.avatar
            result.public_id = data.dpImg.cloudinary_id
        }
        
        if(name){
            data.name = name
        }
        if(description){
            data.educationInfo.description = description[1]
        }

        data = await jobSeekerModel.findByIdAndUpdate(
            {_id}, 
            {
                name: data.name,
                educationInfo : {
                    description: data.educationInfo.description
                },
                dpImg:{
                    avatar: result.secure_url,
                    cloudinary_id: result.public_id
                }
            }
        );
        
        await res.render('jobseeker/profile.ejs', {
            title:data
        })

    }

    // if moreaboutme posted

    if(req.body.typeOfInput == "moreaboutme"){

        //add detail for add/update info of jobseeker

        try{

            const email = req.body.email;
            const dob = req.body.dob;
            const contact = req.body.contact;
            const regiDate = req.body.regdate;
            const resident = req.body.resident;
            const area = req.body.area;
            const city = req.body.city;
            const zipcode = req.body.zipcode;
            const jobtype = req.body.jobtype;
    
            let data = await jobSeekerModel.findById(_id)
    
            if(email){
                data.email = email
            }
            if(dob){
                data.dob = dob
            }
            if(contact){
                data.contact = contact
            }
            if(regiDate){
                data.regiDate = regiDate
            }
            if(resident){
                data.address.resident = resident
            }
            if(area){
                data.address.area = area
            }
            if(city){
                data.address.city = city
            }
            if(zipcode){
                data.address.zipCode = zipcode
            }
            if(jobtype){
                data.jobType = jobtype
            }        
            
            data = await jobSeekerModel.findByIdAndUpdate(
                {_id}, 
                {
                    email : data.email,
                    dob : data.dob,
                    mobileNo : data.contact,
                    regiDate : data.regiDate,                
                    address:{
                        resident : data.address.resident,
                        area : data.address.area,
                        city : data.address.city,
                        zipCode : data.address.zipCode
                    },
                    jobType: data.jobType
                }
            );

            await res.render('jobseeker/profile.ejs',{
                title:data
            })
    
        } catch(err){
            console.log(err);
        }

    }

    // if education info posted

    if(req.body.typeOfInput == "education"){

        try{

            const qualification = req.body.qualification;
            const college = req.body.college;
            const passoutyear = req.body.passoutyear;
            const university = req.body.university;
            const Skills = req.body.Skills;
            const certificates = req.body.certificates;
    
            let data = await jobSeekerModel.findById(_id)
    
            if(qualification){
                data.educationInfo.qualification = qualification
            }
            if(college){
                data.educationInfo.college = college
            }
            if(passoutyear){
                data.educationInfo.passoutYear = passoutyear
            }
            if(university){
                data.educationInfo.university = university
            }
            if(data.educationInfo.description){
                data.educationInfo.description = data.educationInfo.description
            }
            if(Skills){
                data.educationInfo.Skills = Skills
            }
    
            data = await jobSeekerModel.findByIdAndUpdate(
                {_id}, 
                {
                    educationInfo : {
                        qualification : data.educationInfo.qualification,
                        college : data.educationInfo.college,
                        passoutYear : data.educationInfo.passoutYear,
                        university : data.educationInfo.university,
                        description : data.educationInfo.description,
                        Skills : data.educationInfo.Skills,
                        certificates : data.educationInfo.certificates,
                    }
                }
            );
    
            await res.render('jobseeker/profile.ejs',{
                title:data
            })
    
        } catch(err){
            console.log(err);
        }


    }

    else if(req.body.typeOfInput == 'tech'){

        console.log("activated");

        const techName = req.body.tech;

        let data = await jobSeekerModel.findById(_id)

        if(techName){
            data.techName = techName
            console.log(data.techName);
        }

        data = await jobSeekerModel.findByIdAndUpdate(
            {_id}, 
            {
                technologies: data.techName,
            }
        );

        await res.render('jobseeker/profile.ejs', {
            title:data
        })

    }

    else if(req.body.typeOfInput == "workbackgroundinfo"){

        try{

            const compname = req.body.compname;
            const position = req.body.position;
            const workexperienceyear = req.body.workexperienceyear;
            const workdescription = req.body.workdescription;
            const sdate = req.body.sdate;
            const edate = req.body.edate;
            const workedtechnologies = req.body.workedtechnologies;
    
            let data = await jobSeekerModel.findById(_id)
    
            if(compname){
                data.workBackgroundInfo.compname = compname
            }
            if(position){
                data.workBackgroundInfo.position = position
            }
            if(workexperienceyear){
                data.workBackgroundInfo.workexperienceyear = workexperienceyear
            }
            if(workdescription){
                data.workBackgroundInfo.workdescription = workdescription
            }
            if(sdate){
                data.workBackgroundInfo.sdate = sdate
            }
            if(edate){
                data.workBackgroundInfo.edate = edate
            }
            if(workedtechnologies){
                data.workBackgroundInfo.workedtechnologies = workedtechnologies
            }
            data = await jobSeekerModel.findByIdAndUpdate(
                {_id}, 
                {
                    workBackgroundInfo : {
                        compname : data.workBackgroundInfo.compname,
                        position : data.workBackgroundInfo.position,
                        workexperienceyear : data.workBackgroundInfo.workexperienceyear,
                        workdescription : data.workBackgroundInfo.workdescription,
                        sdate : data.workBackgroundInfo.sdate,
                        edate : data.workBackgroundInfo.edate,
                        workedtechnologies : data.workBackgroundInfo.workedtechnologies
                    }
                }
            );
    
            await res.render('jobseeker/profile.ejs',{
                title:data
            })
    
        } catch(err){
            console.log(err);
        }


    }
    else if(req.body.typeOfInput == "Skills"){

        try{

            const Skills = req.body.Skills;
            const certificates = req.body.certificates;
            const qualification = req.body.qualification;
            const college = req.body.college;
            const passoutyear = req.body.passoutyear;
            const university = req.body.university;
    
            let data = await jobSeekerModel.findById(_id)

            if(qualification){
                data.educationInfo.qualification = qualification
            }
            if(college){
                data.educationInfo.college = college
            }
            if(passoutyear){
                data.educationInfo.passoutYear = passoutyear
            }
            if(university){
                data.educationInfo.university = university
            }
            if(data.educationInfo.description){
                data.educationInfo.description = data.educationInfo.description
            }
            if(Skills){
                data.educationInfo.Skills = Skills
            }
            if(Skills){
                data.educationInfo.Skills = Skills
            }
            if(certificates){
                data.educationInfo.certificates = certificates
            }
            data = await jobSeekerModel.findByIdAndUpdate(
                {_id}, 
                {
                    educationInfo : {
                        Skills : data.educationInfo.Skills,
                        certificates : data.educationInfo.certificates,
                        qualification : data.educationInfo.qualification,
                        college : data.educationInfo.college,
                        passoutYear : data.educationInfo.passoutYear,
                        university : data.educationInfo.university,
                        description : data.educationInfo.description,
                        Skills : data.educationInfo.Skills,
                    }
                }
            );
    
            await res.render('jobseeker/profile.ejs',{
                title:data
            })
    
        } catch(err){
            console.log(err);
        }


    }

    else if(req.body.typeOfInput == "Certificates"){

        try{

            const certificates = req.body.certificates;
            const Skills = req.body.Skills;
            const qualification = req.body.qualification;
            const college = req.body.college;
            const passoutyear = req.body.passoutyear;
            const university = req.body.university;
    
            let data = await jobSeekerModel.findById(_id)
    
            if(qualification){
                data.educationInfo.qualification = qualification
            }
            if(college){
                data.educationInfo.college = college
            }
            if(passoutyear){
                data.educationInfo.passoutYear = passoutyear
            }
            if(university){
                data.educationInfo.university = university
            }
            if(data.educationInfo.description){
                data.educationInfo.description = data.educationInfo.description
            }
            if(Skills){
                data.educationInfo.Skills = Skills
            }
            if(certificates){
                data.educationInfo.certificates = certificates
            }
            data = await jobSeekerModel.findByIdAndUpdate(
                {_id}, 
                {
                    educationInfo : {
                        certificates : data.educationInfo.certificates,
                        qualification : data.educationInfo.qualification,
                        college : data.educationInfo.college,
                        passoutYear : data.educationInfo.passoutYear,
                        university : data.educationInfo.university,
                        description : data.educationInfo.description,
                        Skills : data.educationInfo.Skills,
                    }
                }
            );
    
            await res.render('jobseeker/profile.ejs',{
                title:data
            })
    
        } catch(err){
            console.log(err);
        }


    
    }

}

exports.applyOnPost = async (req, res) => {

    const jobseekerId = req.cookies.jobseekerId;
    const postId = req.body.postid;

        var compData = await jobpostModels.find({_id:postId})
        
        var newApply = new applicationOnPost({ 
            jobseekerId,
            postId,
            companyId : compData[0].companyId
        });
    
        await newApply.save();

    const postData = await jobpostModels.find();
    const companyData = await createComapnyModel.find();

    res.render("jobseeker/jobSeekerHome.ejs", {
        title:postData,
        companyData:companyData
    });

}

exports.premiumPackage = (req, res) => {

    res.render("jobseeker/premiumPack.ejs", {
        title:"premiumPackage"
    });
}

exports.buy = async(req,res) => {

    try{

        const cardNumber = req.body.cardNumber;
        const fullName = req.body.fullName;
        const date = req.body.date;
        const cvc = req.body.cvc;
        const jobseekerId = req.cookies.jobseekerId;
        const jobpostId = rew.cookies.postId;

        var newpremiumPackModels = new premiumPackModels({ jobpostId ,otherDetails : [
            { 
                jobseekerId :jobseekerId,
                bankDetils : 
                { 
                    cardNumber,
                    fullName , 
                    date , 
                    cvc
                }
            }
        ]});

        await newpremiumPackModels.save();

        res.render("jobseeker/premiumPack.ejs", {
                title:"buy"
        });
       
    // var newpremiumPackModels = new premiumPackModels ({

    //     cn : req.body.cn,
    //     fn : req.body.fn,
    //     date : req.body.date,
    //     cvc : req.body.cvc,
    //     jobseekerId : req.cookies.jobseekerId

    // });

    // await newpremiumPackModels.save();

    // res.render("jobseeker/premiumPack.ejs", {
    //     title:"buy"
    // });

}
    catch(err){
        console.log(err);
    }
}

exports.logout = async (req, res) => {
    res.clearCookie("jobseekerjwtoken",{path:"/"})
    res.clearCookie("jobseekerId",{path:"/"})
    res.redirect("/home");
}