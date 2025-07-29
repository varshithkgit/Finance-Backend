const validate=require("../componants/validate");
const bcrypt=require("bcrypt");
const userModel=require("../Model/userSchema");
const jwt=require("jsonwebtoken");
const redisClient=require("../config/redis");

const register= async (req,res)=>{
     try{
        validate(req.body);
        req.body.password=await bcrypt.hash(req.body.password,10);
        const user=await userModel.create(req.body);

        const token=jwt.sign({_id:user._id,emailId:user.emailId,userName:user.userName},process.env.JWT_SECRET_KEY,{expiresIn:3600});
        res.cookie("token",token,{maxAge:3600000});
        res.status(201).json({
            user:user,
            message:"Registered Successfuly"
        });
     }catch(e){
        //   res.status(401).json({
        //         message:e?.message,
        //         code:e?.code,
        //         isAxiosError:e?.isAxiosError
        //     });
        res.status(401).send("Error: "+e);
     }
}

const login= async (req,res)=>{
     try{
        const  {emailId,password}=req.body;

        if(!emailId)
            throw new Error("Invalid Credentials")

        if(!password)
            throw new Error("Invalid Credentials")

        const user= await userModel.findOne({emailId:emailId});
        if(!user)
            throw new Error("Account with these credentials does not exist");

        // console.log(password,user);

        const isAllow= await bcrypt.compare(password,user.password);
        if(!isAllow)
            throw new Error("Wrong password");

        const token=jwt.sign({_id:user._id,emailId:user.emailId,userName:user.userName},process.env.JWT_SECRET_KEY,{expiresIn:3600});
        res.cookie("token",token,{maxAge:3600000});
        res.status(200).json({
            user:user,
            message:"Logged in Successfuly"
        });
     }catch(e){
         res.status(403).send("Error"+e);
     }
}

const logout= async (req,res)=>{
     try{
        const {token}=req.cookies;
        await redisClient.set(`token:${token}`,"Blocked");

        const payload=jwt.decode(token);
        await redisClient.expireAt(`token:${token}`,payload.exp);
        
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.status(200).send("Logged out successfully");
     }catch(e){
        res.status(503).send("Error"+e);
     }
}

const check= async (req,res)=>{
    try{
        const reply={
            username:req.result.username,
            _id:req.result._id,
            emailId:req.result.emaailId
        }

        res.status(200).json({
            user:reply,
            message:"Checked successfully"
        })
    }catch(e){
        res.status(400).send("Error"+e);
    }
}

module.exports={register,login,logout,check};