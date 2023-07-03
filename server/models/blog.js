const mongoose=require("mongoose")
const blogSchema=new mongoose.Schema({
    blogTitle:{
        type:String,
        require:true
    },
    blogDesc:{
        type:String,
        require:true
    },
    blogImg: {
        type: String,
        require:true
    }
,
timestamp: {
    type: Date,
    default: Date.now 
  } 
}
)
module.exports=mongoose.model('Blog',blogSchema) 