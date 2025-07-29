const userFinanceModel=require("../Model/userFinance");

const finance= async  (req,res)=>{
     try{
        const {date,amount}=req.body;
        if(!date||!amount)//qna is y should we validate eventhough in schema it is required:true
            throw new Error("Some field is missing")//ans is if req->cost ^ses so to prevent unwanted DB calls we validate i http server only 
        
            
        const expanse=await userFinanceModel.create({userId:req.result._id,...req.body});

        res.status(201).json({
            expanse:expanse,
            message:"Expanse stored"
        });
     }catch(e){
        res.status(400).send("Error"+e);
     }
}

const getExpanses=async (req,res)=>{
    try{
        const {_id}=req.result;

        if(!_id)
            throw new Error("Id does not exist");

        const expanses= await userFinanceModel.find({userId:_id});

        if(!expanses)
            return res.status(200).send("There are no expanses");

        res.status(200).json(expanses);

    }catch(e){
        res.status(404).send("Error"+e);
    }
}
module.exports={finance,getExpanses};