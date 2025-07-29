const validator =require("validator");

const validate=(data)=>{
    const mandatoryField=["userName","emailId","password"];

    const isAllow=mandatoryField.every(ele=> Object.keys(data).includes(ele));

    if(!isAllow)
        throw new Error("Missing Field");

    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid  Email");

    if(!validator.isStrongPassword(data.password))
        throw new Error("Not a strong  password");
}

module.exports=validate;