const RegisterModel = require("../Model/register.model");
const passport = require('passport');
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const secret = process.env.SECRET_KEY

const options = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:secret
}

const strategy = new JWTStrategy(options,async(payload,done)=>{

    let currentTime = Math.floor(Date.now()/1000)

    if(payload.exp < currentTime){
        return done(new Error("Token expired, please re-login"), false);
      }

    try{
        let username = payload.user
        const customer = await RegisterModel.findOne({username})
        return done(null,customer)
    }
    catch(error){
        return done(error,false)
    }
})

module.exports = (passport) => {
    passport.use(strategy);
 };
 