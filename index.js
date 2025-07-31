const express=require("express");
const redisClient=require("./src/config/redis");
const main=require("./src/config/mongoDB")
const app=express();
const userRouter=require("./src/routes/userRouter");
const financeRouter=require("./src/routes/financeRouter");
require("dotenv").config();
const cookieParse=require("cookie-parser");
const  cors=require("cors");

const corsOptions = {
  origin: "https://finance-frontend-silk.vercel.app/",
  credentials:true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParse());

app.use("/user",userRouter);
app.use("/tracker",financeRouter);

const initializer= async ()=>{
    try{
    await Promise.all([main(),redisClient.connect()]);
    console.log("DB as connected");

    // app.listen(process.env.PORT_NO,()=>{
    //     console.log(`Listening at port number: ${process.env.PORT_NO}`);
    // })
}catch(e){
    console.log("Error: "+e);
}
}

initializer();

module.exports=app;