var express = require('express');
var route = express.Router();
const controller = require("../../controller/company/companyController");
const upload = require("../../utils/multer");

route.get("/profile", controller.profile);

route.post("/profile", upload.single('image'), controller.postProfile);

route.get("/signUp", controller.signUp);

route.post("/signUp" , controller.createCompany);

route.get("/jobApplication", controller.jobApplication);

route.get("/home", controller.companyHome);

route.get("/createPost", controller.createPost);

route.post("/createPost", controller.post);

route.get("/myPost", controller.myPost);

route.get("/success", controller.success);

route.post("/", controller.applications);

route.get("/logout", controller.logout);

module.exports = route
