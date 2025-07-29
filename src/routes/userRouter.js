const express=require("express");
const userRouter=express.Router();
const {register,login,logout,check}=require("../controllers/rll");
const userMiddleWare=require("../middleware/userMiddleWare");

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.post("/logout",logout);
userRouter.get("/check",userMiddleWare,check);

module.exports=userRouter;