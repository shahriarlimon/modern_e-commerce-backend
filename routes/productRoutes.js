const express = require('express');
const { getAllProducts, getSingleProduct, updateProduct, deleteProduct, createProduct } = require('../controllers/productController');
const router = express.Router();


router.get("/", getAllProducts)
router.get("/:id", getSingleProduct)
router.post("/create", createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

module.exports = router;