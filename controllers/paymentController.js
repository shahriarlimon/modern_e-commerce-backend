const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
require("dotenv").config()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',
    })
    res.send({
        success: true,
        client_secret: myPayment.client_secret
    })
})

exports.sendApiKey = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY })
})