/* saving token in cookie */
exports.sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();
    /* options for cookie */
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        sameSite: "none",
        secure: true,
        httpOnly: true
    }
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    })
}