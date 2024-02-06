const jwt = require("jsonwebtoken");
const passport = require("passport")


const verifyAuth= async (req, res, next) => {
    passport.authenticate("jwt", { session: false },(err,user,info)=>{
        if(err || info || !user){
            return res.status(404).json({message:"Session expired, please re-login"})
        }
        req.user = user
        next()
    })(req, res, next);
};

module.exports = verifyAuth;
