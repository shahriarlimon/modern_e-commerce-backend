const User = require("../models/user");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const { sendToken } = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");
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
    const isPasswordMatched = user.comparePassword(password)
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

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(new ErrorHandler("user not found", 404))
    const resetToken = user.getPasswordResetToken();
    await user.save({ validateBeforeSave: false })
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/password/reset/${resetToken}`;
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore it`;
    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password recovery`,
            message
        });
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))


    }
})

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new ErrorHandler(
                "Reset Password Token is invalid or has been expired",
                400
            )
        );
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not password", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});