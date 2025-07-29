const mongoose=require("mongoose");
const {Schema}=mongoose;

const userFinance=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    date:{
        type:Number,//type:Date
        required:true
    },
    amount:{
        type:Number,
        required:true,
        default:0
    },
    description:{
        type:String,
        default:'-'
    },
    category:{
        type:String,
        // enum:[""]
        default:'-'
    }
});

const userFinanceModel=mongoose.model("finance",userFinance);
module.exports=userFinanceModel;