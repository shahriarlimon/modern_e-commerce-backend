const express = require('express');
const app = express();
const errorMiddleware = require("../middlewares/error")
const productRoutes = require("./productRoutes")
const userRoutes = require("./userRoutes")
app.use("/products", productRoutes)
app.use("/user", userRoutes)
app.use(errorMiddleware)
module.exports = app;