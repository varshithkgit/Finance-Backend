const express=require("express");
const financeRouter=express.Router();
const {finance,getExpanses}=require("../controllers/finance");
const userMiddleWare=require("../middleware/userMiddleWare");

financeRouter.post("/finance",userMiddleWare,finance);
financeRouter.get("/getExpanses",userMiddleWare,getExpanses);

module.exports=financeRouter;