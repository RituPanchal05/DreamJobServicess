const route = require("express").Router();
const controller = require("../../controller/jobseeker/jobseekerController")
const authentication = require("../../middleware/authenticate")
const checkLogin = require("../../middleware/checkLogin")
const upload = require("../../utils/multer")

route.get("/signUp", controller.signUp);

route.post("/signUp", controller.createjobSeeker);

route.get("/profile", controller.getProfile);

route.post("/profile", upload.single('image'), controller.postProfile);

route.get("/jobApplication", controller.jobApplication);

route.get("/makeResume", controller.makeResume);

route.get("/companies", controller.companies);

route.post('/', controller.applyOnPost);

route.get("/premiumPackage", controller.premiumPackage);

route.post("/premiumPackage", controller.buy);

route.get("/logout", controller.logout);

module.exports = route;