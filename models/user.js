const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
    minlength: [8, "password should at least be 8 characters long"],
    maxlength: 1024
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  /*  address: {
     type: String,
     required: true,
     minlength: 2,
     maxlength: 100
   },
   city: {
     type: String,
     required: true,
     minlength: 2,
     maxlength: 50
   },
   state: {
     type: String,
     required: true,
     minlength: 2,
     maxlength: 50
   },
   zipCode: {
     type: String,
     required: true,
     minlength: 5,
     maxlength: 10
   },
   country: {
     type: String,
     required: true,
     minlength: 2,
     maxlength: 50
   },
   phoneNumber: {
     type: String,
     required: true,
     minlength: 10,
     maxlength: 20
   },
   orders: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Order'
   }], */
  role: {
    type: String,
    default: "user"
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});
userSchema.pre('save', async function (next) {
  if (!this.isModified("password")) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10)
})
/* jwt token */
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRE_TIME
  })

}

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(this.password, enteredPassword)

}
module.exports = mongoose.model('User', userSchema);
