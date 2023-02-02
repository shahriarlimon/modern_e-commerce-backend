const express = require('express');
const { getAllProducts, getSingleProduct, updateProduct, deleteProduct, createProduct, createProductReview, getProductsForAdmin, getProductReviews, deleteReview } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/auth');
const router = express.Router();


router.get("/", getAllProducts)
router.get("/admin/products", isAuthenticatedUser, authorizeRole("admin"), getProductsForAdmin)
router.get("/:id", getSingleProduct)
router.get("/admin/reviews", isAuthenticatedUser, authorizeRole("admin"), getProductReviews)
router.post("/create", isAuthenticatedUser, authorizeRole("admin"), createProduct)
router.put('/review', isAuthenticatedUser, createProductReview)
router.put("/:id", isAuthenticatedUser, authorizeRole("admin"), updateProduct)
router.delete("/:id", isAuthenticatedUser, authorizeRole("admin"), deleteProduct)
router.delete("/admin/review", isAuthenticatedUser, authorizeRole("admin"), deleteReview)


module.exports = router;