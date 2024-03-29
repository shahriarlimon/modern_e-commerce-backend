const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("Please Login to access this resource", 401));
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next()

})

exports.authorizeRole = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next((new ErrorHandler(`Role:${req.user.role} is not allowed to access this resource`, 403)))
        }
        next()
    }
}