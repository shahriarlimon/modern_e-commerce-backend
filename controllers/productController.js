const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/product")
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.find({})
    res.status(201).json({
        success: true,
        product,
    });

})

/* getting single product */

exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(201).json({
        success: true,
        product,
    });
})


/* for admin */
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product,
    });
})
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(201).json({
        success: true,
        product,
    });

})
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    await Product.findByIdAndDelete(req.params.id)
    res.status(201).json({
        success: true,
        message: "Product deleted successfully!"
    });
})