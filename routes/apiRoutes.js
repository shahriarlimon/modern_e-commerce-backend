const express = require('express');
const app = express();
require("dotenv").config()
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const errorMiddleware = require("../middlewares/error")
const productRoutes = require("./productRoutes")
const userRoutes = require("./userRoutes")
const orderRoutes = require("./orderRoutes")
const paymentRoutes = require("./paymentRoute")
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

/* imported routes */
app.use("/products", productRoutes)
app.use("/user", userRoutes)
app.use("/order", orderRoutes)
app.use("/payment", paymentRoutes)
app.use(errorMiddleware)
module.exports = app;