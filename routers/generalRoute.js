const route = require("express").Router();
const controller = require("../controller/generalController")
const jobSeekerModel = require("../model/jobSeeker/jobSeekerModel");
const companyModel = require("../model/company/createCompany");
const authentication = require("../middleware/authenticate")
const checkLogin = require("../middleware/checkLogin")
const delay = require("express-delay")

route.get("/home", controller.mainHome);

route.get("/login", controller.login);

route.post("/login", checkLogin, (req, res) => {
    res.redirect('/')
});

route.get("/", authentication, controller.homelogin);

route.get("/contactUs", controller.contactus);

route.get("/feedback", controller.feedback);

route.post("/feedback", controller.feedbackpost);

route.get("/topCompanies" , controller.topcompanies);

module.exports = route