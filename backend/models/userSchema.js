const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {type:String,required:true,trim:true},
  lastname:{type:String,required:true,trim:true},
  mobile:{type:Number,required:true,trim:true},
  email:{type:String,required:true,trim:true},
  password:{type:String,required:true,trim:true},
  dob:{type:Date,required:true,trim:true},
  role:{type:String,required:true,trim:true,default:'User'},
  addressInfo:{addressLine1:String, addressLine2:String,city:String,pin: Number}
})

module.exports = mongoose.model('User',userSchema);
