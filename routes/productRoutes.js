const express = require('express');
const { getAllProducts, getSingleProduct, updateProduct, deleteProduct, createProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');
const router = express.Router();


router.get("/", getAllProducts)
router.get("/:id", isAuthenticatedUser, authorizeRole("admin"), getSingleProduct)
router.post("/create",isAuthenticatedUser, createProduct)
router.put("/:id", updateProduct)
router.delete("/:id", deleteProduct)

module.exports = router;