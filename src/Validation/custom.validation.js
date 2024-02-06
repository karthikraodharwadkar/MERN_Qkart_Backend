const password = (value,helpers) =>{
    if(value.length<8){
        return helpers.message("password must be 8 characters")
    }
    if(!value.match(/\d/) || !value.match(/[a-zA-Z]/)){
        return helpers.message("password must contain at least 1 letter and 1 number")
    }
return value
}

const mongoId = (value,helpers) =>{
    if(!value.match(/[a-zA-Z0-9]/)){
        return helpers.message("Id should be valid mongoId")
    }
    return value
}

module.exports = {password,mongoId}