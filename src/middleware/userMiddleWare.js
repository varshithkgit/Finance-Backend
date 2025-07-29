const jwt=require("jsonwebtoken");
const userModel=require("../Model/userSchema");
const redisClient=require("../config/redis");

const userMiddleWare= async (req,res,next)=>{
       try{
        const {token}=req.cookies;

        if(!token)
            throw new Error("Session expired");

        const payload=jwt.verify(token,process.env.JWT_SECRET_KEY);
        const {_id}=payload;

        if(!_id)
            throw new Error("Id not present");

        const user=await userModel.findById(_id);

        if(!user)
            throw new Error("user does not exist");

        // console.log(user);

        req.result=user;

        const isAllow= await redisClient.exists(`token:${token}`);

        if(isAllow)
            throw new Error("token logged out");

        next();
       }catch(e){
        res.status(400).send("Error: "+e);
       }
}

module.exports=userMiddleWare;