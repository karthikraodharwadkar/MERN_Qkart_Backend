const {deleteUserAddress,editUserAddress} = require("../Service/profile.service")

const deleteUserAddressProfile = async(req,res)=>{
    const {_id,useremail} = req.body
    try{
        let response = await deleteUserAddress(_id,useremail);
        res.status(201).json({message:response})
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}

const editUserAddressProfile = async(req,res)=>{
    const {_id,tokenEmail} = req.body
    try{
        let response = await editUserAddress(_id,tokenEmail);
        res.status(201).json({message:response})
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}

module.exports = {deleteUserAddressProfile,editUserAddressProfile}