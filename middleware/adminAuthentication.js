const jwt = require("jsonwebtoken")
const adminModel = require("../model/adminModel")

const authenticate = async (req,res,next) => {
    try {

        const token = req.cookies.jwtoken
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)

        const rootAdmin = await adminModel.findOne({_id:verifyToken._id, "tokens.token":token})
        if(!rootAdmin){ throw new Error("unauthorized admin") }

        // req.token = token
        // req.rootadmin = rootAdmin // getting whole documetn of admin
        // req._id = rootAdmin._id

        next()
        
    } catch (error) {
        res.status(403).send("unauthorized token provided")
    }
}

module.exports = authenticate