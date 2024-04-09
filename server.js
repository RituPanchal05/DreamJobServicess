const express = require("express");
const app = express();
const port = process.env.PORT || 3003;
const conn = require("./database/conn")
const generalRouter = require("./routers/generalRoute")
const companyRouter = require("./routers/company/companyRoute")
const jobseekerRouter = require("./routers/jobseeker/jobseekerRoutes")
const path = require("path")
const cookieParser = require("cookie-parser")
app.use(cookieParser()); 

//-------------------------------------------------

// connect to db
conn();

//set path for public folder
app.use(express.static(path.join(__dirname,"./public")))
app.use(express.static(path.join(__dirname,"./views")))

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//set template engine 
app.set("view engine" , "ejs");

//use router
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/", generalRouter);
app.use("/company", companyRouter);
app.use("/jobseeker", jobseekerRouter)
app.get("/*", (req, res) => {
    res.send("<h1 align='center'>404 page not found</h1>")
});
//-------------------------------------------------

app.listen(port, ()=>{
    console.log(`listening to the port ${port}`)
});