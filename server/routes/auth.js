const router=require('express').Router();
const bcrypt = require("bcrypt");
const Users=require("./../models/admin")
const jwt = require("jsonwebtoken");
const JWT="eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3NTg2NTEwOCwiaWF0IjoxNjc1ODY1MTA4fQ.3yUi0GJAK_oOB8CoVigMJrNSIZR7NCUw3GFGCfYP3Lk"

router.post("/register", async(req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).json("User created");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/login/auth",async(req,res)=>{
    try{
        const user=await Users.findOne({email:req.body.email})
        const correctPass=await bcrypt.compare(req.body.password,user.password)
        if(!user){
            res.status(404).json("NO user found")
        }
        else if(!correctPass){
            res.status(400).json("Wrong password")
        }
        else{
          const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},JWT)
              
          const {password,isAdmin,...otherdetails}=user._doc;
          res.cookie("access_token",token,{httpOnly:true,}).status(200).json("login successfull");
          // res.status(200).json({...otherdetails})
        }
    } 
    catch(err){ 
      console.log(err)
    }
})

module.exports=router
