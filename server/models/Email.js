const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  fname:{type:String,required:true},
  lname:{type:String,required:true},
  from: { type: String, required: true },
  phone: { type: Number, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", emailSchema);
