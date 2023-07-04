const router=require('express').Router();
const bcrypt = require("bcrypt");
const Users=require("./../models/admin")
const jwt = require("jsonwebtoken");

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
    res.status(200).send("User created");
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/login",async(req,res)=>{
    try{
        const user=await Users.findOne({username:req.body.username})
        if(!user){
            res.status(404).send("NO user found")
        }
        const correctPass=await bcrypt.compare(req.body.password,user.password)
        if(!correctPass){
            res.status(400).send("Wrong password")
        }
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
              
        const {password,isAdmin,...otherdetails}=user._doc;
        res.cookie("access_token",token,{httpOnly:true,}).status(200).json({...otherdetails});
        // res.status(200).json({...otherdetails})
    }
    catch(err){ 
        res.status(500).json(err)
    }
})

module.exports=router
