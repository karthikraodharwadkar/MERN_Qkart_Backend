const { createUserRegistration, loginUserWithEmailAndPassword, getProductsData,patchUserRegistration,fetchUserDetails } = require("../Service/register.service")
let nodemailer = require('nodemailer');
const generateMail = require("../mail");
const { generateAccessToken } = require("../Service/jwtToken.service");

const postUserRegistration = async (req, res) => {
    try {
        let response = await createUserRegistration(req.body)
        if (response) {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sqlkdpc@gmail.com',
                    pass: 'vxqf xmqv yelq akod'
                }
            });

            let mailOptions = {
                from: 'sqlkdpc@gmail.com',
                to: response.useremail,
                subject: 'Welcome to Qkart',
                text: generateMail(response)
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
        let token = await generateAccessToken(response)
        
        return res.status(201).json({user:response,tokens:token})
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const postUserlogin = async (req, res) => {
    try {
        let { username, password,useremail } = req.body
       
        let response = await loginUserWithEmailAndPassword(username, password,useremail)
        
        let token = await generateAccessToken(response)
        return res.status(200).json({user:response,tokens:token})
    }
    catch (error) {
        return res.status(404).json({message:error.message})
    }
}

const getProducts = async (req, res) => {
    try {
        let response = await getProductsData()
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(400).json({message:error.message})
    }
}

const putUserRegistration = async(req,res)=>{
    try{
        let response = await patchUserRegistration(req.body)
        res.status(201).json({message:response})
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

const getUserRegistration = async(req,res)=>{
    let {useremail} = req.user
    try{
        let response = await fetchUserDetails(useremail)
        res.status(200).json({message:response})
    }catch(error){
        
        res.status(404).json({message:error.message})

    }
}



module.exports = { postUserRegistration, postUserlogin, getProducts,putUserRegistration,getUserRegistration }