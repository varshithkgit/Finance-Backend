const mongoose=require("mongoose");
const {Schema}=mongoose;

const userSchema= new Schema({
    userName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:15
    },
    emailId:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }
});

const userModel=mongoose.model("user",userSchema);
module.exports=userModel;