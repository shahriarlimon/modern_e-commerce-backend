const User = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { sendToken } = require("../utils/sendToken");
/* register a user */
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) return next(new ErrorHandler("User with that email already exists", 404));
    const newUser = await User.create({
        name, email, password, avatar: {
            public_id: "this is sample public id",
            url: "thisisurl"
        }
    })
    sendToken(newUser, 201, res)
})
exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) next(new ErrorHandler("Please enter email and password", 400));
    const user = await User.findOne({ email })
    if (!user) return next(new ErrorHandler("Invalid email or password", 401));
    const isPasswordMatched = await user.comparePassword(password)
    if (!isPasswordMatched) next(new ErrorHandler("Invalid email/password", 401));
    sendToken(user, 201, res)

})

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(201).json({
        success: true,
        message: "Logged out"
    })
})