const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require('crypto');

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
  createdAt: {
    type: Date,
    default: Date.now()
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
  return await bcrypt.compare(enteredPassword, this.password)

}


/* generating password reset token */
userSchema.methods.getPasswordResetToken = function () {
  /* generating token */
  const resetToken = crypto.randomBytes(20).toString("hex")
  /* hashing and add to userSchema */
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
  return resetToken;


}
module.exports = mongoose.model('User', userSchema);
