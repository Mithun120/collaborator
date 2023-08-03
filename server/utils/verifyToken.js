const jwt=require("jsonwebtoken");
const JWT="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3NTg2NTEwOCwiaWF0IjoxNjc1ODY1MTA4fQ.3yUi0GJAK_oOB8CoVigMJrNSIZR7NCUw3GFGCfYP3Lk"

 const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token
    if(!token){
     res.status(401).json("not authenticated")   
    }
    jwt.verify(token,JWT,(err,user)=>{
        if(err){
            res.status(401).json("token not valid")
        }
        req.user=user
        next()
    })
}

 const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You are not authorized")
        }
    })
}

const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next();
        }
        else{
            res.status(403).json("You are not authorized")
        }
    })
}
module.exports={verifyAdmin,verifyToken,verifyUser}