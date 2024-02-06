const RegisterModel = require("../Model/register.model")

const deleteUserAddress = async (addressId, useremail) => {
    try {
        let isAddressExist = await RegisterModel.findOne({ useremail })
        if (!isAddressExist) {
            throw new Error("User not found")
        }

        let findUserAdressesIndex = isAddressExist.addresses.findIndex((item) => JSON.parse(item)._id == addressId)

        isAddressExist.addresses.splice(findUserAdressesIndex, 1)

        await isAddressExist.save()
    } catch (error) {
        throw new Error(error.message)
    }
}

const editUserAddress = async (addressId, tokenEmail) => {
    try {
        let isAddressExist = await RegisterModel.findOne({ tokenEmail })
        if (!isAddressExist) {
            throw new Error("User not found")
        }

        let findUserAdressesIndex = isAddressExist.addresses.findIndex((item) => JSON.parse(item)._id == addressId)

        //isAddressExist.addresses.splice(findUserAdressesIndex, 1)
        //await isAddressExist.save()
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = { deleteUserAddress,editUserAddress }